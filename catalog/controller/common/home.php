<?php
class ControllerCommonHome extends Controller
{
	public function index()
	{
		$this->document->setTitle($this->config->get('config_meta_title'));
		$this->document->setDescription($this->config->get('config_meta_description'));
		$this->document->setKeywords($this->config->get('config_meta_keyword'));

		if (isset($this->request->get['route'])) {
			$this->document->addLink($this->config->get('config_url'), 'canonical');
		}

		$setting_value = $this->load->controller('custom/setting/getValue', array(
			'section' => 'settings', // Unique section identifier
			'setting' => 'settings_visual', // Unique field identifier
			'page' => 'setting' // Form code in the admin panel
		))['home'];

		$data['background_image'] = 'image/' . $setting_value['settings_image_background'];
		$data['animation_image'] = 'image/' . $setting_value['setting_image_animation'];

		$this->load->model('catalog/manufacturer');
		$this->load->model('tool/image');
		$this->load->model('catalog/category');
		$this->load->model('catalog/product');

		// countries
		foreach ($this->model_catalog_manufacturer->getManufacturers(['start' => 0, 'limit' => 24, 'sort' => 'sort_order']) ?? [] as $manufacturer) {
			$data['manufacturers'][] = [
				'name' => $manufacturer['name'],
				'image' => $this->model_tool_image->resize($manufacturer['image'], 40, 40),
				'href' => $this->url->link('product/manufacturer', 'manufacturer_id=' . $manufacturer['manufacturer_id'])
			];
		}

		// regions

		$regional_category_id = 60;
		foreach ($this->model_catalog_category->getCategories($regional_category_id) ?? [] as $category) {
			$path = $category['category_id'];
			if ($category['parent_id'] != 0) {
				$path = $category['parent_id'].'_'.$path;
			}

			$data['categories'][] = [
				'name' => $category['name'],
				'image' => $this->model_tool_image->resize($category['image'], 40, 40),
				'href' => $this->url->link('product/category', 'path=' . $path)
			];
		}

		// global eSIMs

		$global_category_id = 61;

		$sub_categories = $this->model_catalog_category->getCategories($global_category_id) ?? [];
		foreach ($sub_categories as $category) {
			$products = [];
			foreach ($this->model_catalog_product->getProducts(['filter_category_id' => $category['category_id'], 'start' => 0, 'limit' => 12, 'sort' => 'sort_order']) ?? [] as $product) {
				$products[] = [
					'product_id' => $product['product_id'],
					'name' => $product['name'],
					'coverage' => 1, // todo
					'data' => $product['data'],
					'validity' => $product['validity'],
					'price' => $this->currency->format($this->tax->calculate($product['price'], $product['tax_class_id'], $this->config->get('config_tax')), $this->config->get('config_currency')),
					'href' => $this->url->link('product/product', 'product_id=' . $product['product_id'])
				];
			}

			$data['sub_categories'][] = [
				'name' => $category['name'],
				'products' => $products
			];
		}


		$data['column_left'] = $this->load->controller('common/column_left');
		$data['column_right'] = $this->load->controller('common/column_right');
		$data['content_top'] = $this->load->controller('common/content_top');
		$data['content_bottom'] = $this->load->controller('common/content_bottom');
		$data['footer'] = $this->load->controller('common/footer');
		$data['header'] = $this->load->controller('common/header');
		$data['menu'] = $this->load->controller('common/menu');

		$this->response->setOutput($this->load->view('common/home', $data));
	}
}
