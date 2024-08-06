<?php

class ControllerExtensionModuleAboutUs extends Controller {

    private $error = array();
    private $prefix;

    public function __construct($registry) {
        parent::__construct($registry);
        $this->prefix = (version_compare(VERSION, '3.0', '>=')) ? 'module_' : '';
    }

    public function index() {
        if ($this->config->get($this->prefix . 'about_us_status')) {
            $data = $this->load->language('extension/module/about_us');

            $data['breadcrumbs'] = array();

            $data['breadcrumbs'][] = array(
                'text'      => $this->language->get('text_home'),
                'href'      => $this->url->link('common/home'),
                'separator' => false
            );

            $data['breadcrumbs'][] = array(
                'text'      => _e("About us"),
                'href'      => $this->url->link('extension/module/about_us'),
            );

            $data['column_left'] = $this->load->controller('common/column_left');
            $data['column_right'] = $this->load->controller('common/column_right');
            $data['content_top'] = $this->load->controller('common/content_top');
            $data['content_bottom'] = $this->load->controller('common/content_bottom');
            $data['footer'] = $this->load->controller('common/footer');
            $data['header'] = $this->load->controller('common/header');
            $data['menu'] = $this->load->controller('common/menu');
            
            return $this->response->setOutput($this->load->view('extension/module/about_us', $data));
        }
    }

}
