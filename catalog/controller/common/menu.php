<?php
class ControllerCommonMenu extends Controller {
	public function index() {
		$this->load->language('common/menu');

		$language_id = $this->config->get('config_language_id');
		$this->request->get['route'] = $this->request->get['route'] ?? 'common/home';
		
		$data['logo'] = 'image/'. $this->config->get('config_logo');

		$data['links'][] = [
			'text' => _e("Home"),
			'href' => $this->url->link('common/home'),
			'is_active' => $this->request->get['route'] == 'common/home'
		];

		$data['links'][] = [
			'text' => _e("Store"),
			'href' => $this->url->link('product/category'),
			'is_active' => $this->request->get['route'] == 'product/category'
		];

		$informations = $this->load->controller('custom/setting/getValue', array(
			'section' => 'menu', // Unique section identifier
			'setting' => 'menu_informations', // Unique field identifier
			'page' => 'setting' // Form code in the admin panel
		)) ?? [];

		$this->load->model('catalog/information');

		foreach ($informations as $information) {
			$information_info = $this->model_catalog_information->getInformation($information['value']);

			$data['links'][] = [
				'text' => $information_info['title'],
				'href' => $this->url->link('information/information', 'information_id=' . $information_info['information_id']),
				'is_active' => $this->request->get['route'] == 'information/information' && $information_info['information_id'] == $this->request->get['information_id']
			];
		}

		$custom_links = $this->load->controller('custom/setting/getValue', array(
			'section' => 'menu', // Unique section identifier
			'setting' => 'menu_custom_links', // Unique field identifier
			'page' => 'setting' // Form code in the admin panel
		)) ?? [];

		foreach ($custom_links as $block) {
			$title = $block['menu_text'][$language_id];
			$link = $block['menu_link'][$language_id];
			$is_active = $_SERVER['REQUEST_URI'] === $link; 

			$data['links'][] = [
				'text' => $title,
				'href' => $link,
				'is_active' => $is_active
			];
		}

		$data['social_links'] = $this->load->controller('components/render/social_links');

		$data['catalog_link'] = $this->url->link('product/category');
		$data['home_link'] = $this->url->link('common/home');
		
		if ($this->customer->isLogged()) {
			$data['account'] = $this->url->link('account/account', '', true);
		} else {
			$data['account'] = $this->url->link('account/login', '', true);
		}

		return $this->load->view('common/menu', $data);
	}
}
