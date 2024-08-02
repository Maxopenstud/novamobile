<?php
class ControllerCommonFooter extends Controller {
	public function index() {
		$this->load->language('common/footer');

		$this->load->model('catalog/information');

		$data['informations'] = array();

		foreach ($this->model_catalog_information->getInformations() as $result) {
			if ($result['bottom']) {
				$data['informations'][] = array(
					'title' => $result['title'],
					'href'  => $this->url->link('information/information', 'information_id=' . $result['information_id'])
				);
			}
		}

		$language_id = $this->config->get('config_language_id');

		$data['social_links'] = $this->load->controller('components/render/social_links');

		if ($this->request->server['HTTPS']) {
			$server = $this->config->get('config_ssl');
		} else {
			$server = $this->config->get('config_url');
		}

		if (is_file(DIR_IMAGE . $this->config->get('config_logo'))) {
			$data['logo'] = $server . 'image/' . $this->config->get('config_logo');
		} else {
			$data['logo'] = '';
		}

		$data['year'] = date('Y');
		$data['telephone'] = $this->config->get("config_telephone");

		$countries = $this->load->controller('custom/setting/getValue', array(
			'section' => 'footer', // Unique section identifier
			'setting' => 'footer_category_autocomplete', // Unique field identifier
			'page' => 'setting' // Form code in the admin panel
		)) ?? [];

		$this->load->model('catalog/manufacturer');
		$this->load->model('catalog/information');

		foreach ($countries as $country) {
			$manufacturer = $this->model_catalog_manufacturer->getManufacturer($country['value']);

			$data['manufacturers'][] = [
				'name' => $manufacturer['name'],
				'href' => $this->url->link('product/manufacturer', 'manufacturer_id='.$country['value'], true)
			];
		}

		$articles_block = $this->load->controller('custom/setting/getValue', array(
			'section' => 'footer', // Unique section identifier
			'setting' => 'footer_articles_block', // Unique field identifier
			'page' => 'setting' // Form code in the admin panel
		));

		foreach ($articles_block as $row) {
			$articles = [];
			foreach ($row['footer_articles'] as $article) {
				$information = $this->model_catalog_information->getInformation($article['value']);
				
				$articles[] = [
					'name' => $information['title'],
					'href' => $this->url->link('information/information', 'information_id='.$article['value'], true)
				];
			}

			$data['articles_block'][] = [
				'title' => $row['footer_title'][$language_id],
				'articles' =>  $articles
			];
		}

		$custom_links_setting = $this->load->controller('custom/setting/getValue', array(
			'section' => 'footer', // Unique section identifier
			'setting' => 'footer_custom_links', // Unique field identifier
			'page' => 'setting' // Form code in the admin panel
		));

		foreach ($custom_links_setting as $block) {
			$links = [];

			foreach ($block['footer_link_block'] as $custom_links) {
				$links[] = [
					'title' => $custom_links['footer_title'][$language_id],
					'link' => $custom_links['footer_link'][$language_id]
				];
			}

			$data['custom_links_block'][] = [
				'name' => $block['footer_title'][$language_id],
				'links' => $links
			];
		}

		$small_icons = $this->load->controller('custom/setting/getValue', array(
			'section' => 'footer', // Unique section identifier
			'setting' => 'footer_image_block', // Unique field identifier
			'page' => 'setting' // Form code in the admin panel
		));	

		foreach ($small_icons as $icon) {
			$data['small_icons'][] = $this->model_tool_image->resize($icon['footer_image'], $icon['footer_image_width'], $icon['footer_image_height']);
		}
 
		$data['home'] = $this->url->link('common/home');
		$data['contact'] = $this->url->link('information/contact');
		$data['return'] = $this->url->link('account/return/add', '', true);
		$data['sitemap'] = $this->url->link('information/sitemap');
		$data['tracking'] = $this->url->link('information/tracking');
		$data['manufacturer'] = $this->url->link('product/manufacturer');
		$data['voucher'] = $this->url->link('account/voucher', '', true);
		$data['affiliate'] = $this->url->link('affiliate/login', '', true);
		$data['special'] = $this->url->link('product/special');
		$data['account'] = $this->url->link('account/account', '', true);
		$data['order'] = $this->url->link('account/order', '', true);
		$data['wishlist'] = $this->url->link('account/wishlist', '', true);
		$data['newsletter'] = $this->url->link('account/newsletter', '', true);

		$data['powered'] = sprintf($this->language->get('text_powered'), $this->config->get('config_name'), date('Y', time()));

		// Whos Online
		if ($this->config->get('config_customer_online')) {
			$this->load->model('tool/online');

			if (isset($this->request->server['REMOTE_ADDR'])) {
				$ip = $this->request->server['REMOTE_ADDR'];
			} else {
				$ip = '';
			}

			if (isset($this->request->server['HTTP_HOST']) && isset($this->request->server['REQUEST_URI'])) {
				$url = ($this->request->server['HTTPS'] ? 'https://' : 'http://') . $this->request->server['HTTP_HOST'] . $this->request->server['REQUEST_URI'];
			} else {
				$url = '';
			}

			if (isset($this->request->server['HTTP_REFERER'])) {
				$referer = $this->request->server['HTTP_REFERER'];
			} else {
				$referer = '';
			}

			$this->model_tool_online->addOnline($ip, $this->customer->getId(), $url, $referer);
		}

		$data['scripts'] = $this->document->getScripts('footer');
		$data['styles'] = $this->document->getStyles('footer');
		
		return $this->load->view('common/footer', $data);
	}
}
