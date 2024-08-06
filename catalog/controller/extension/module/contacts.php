<?php

class ControllerExtensionModuleContacts extends Controller {

    private $error = array();
    private $prefix;

    public function __construct($registry) {
        parent::__construct($registry);
        $this->prefix = (version_compare(VERSION, '3.0', '>=')) ? 'module_' : '';
        $this->prefix .= 'contacts_';
    }

    public function index() {
        if ($this->config->get($this->prefix . 'status')) {
            $data = $this->load->language('extension/module/contacts');

            $width = $this->config->get($this->prefix.'width');
            $height = $this->config->get($this->prefix.'height');

            $this->load->model('catalog/information');
            $this->load->model('tool/image');
            $this->load->model('extension/module/contacts');

            $language_id = $this->config->get('config_language_id');

            $article = $this->load->controller('custom/setting/getValue', array(
                'section' => 'contacts', // Unique section identifier
                'setting' => 'contacts_article', // Unique field identifier
                'page' => 'module_contacts' // Form code in the admin panel
            ));

            $article = $this->model_catalog_information->getInformation($article['value']);
            $data['article'] = [
                'name' => $article['title'],
                'href' => $this->url->link("information/information", '&information_id='.$article['information_id'], true)
            ];

            $data['title'] = $this->load->controller('custom/setting/getValue', array(
                'section' => 'contacts', // Unique section identifier
                'setting' => 'contacts_title', // Unique field identifier
                'page' => 'module_contacts' // Form code in the admin panel
            ))[$language_id];

            $data['description'] = $this->load->controller('custom/setting/getValue', array(
                'section' => 'contacts', // Unique section identifier
                'setting' => 'contacts_description', // Unique field identifier
                'page' => 'module_contacts' // Form code in the admin panel
            ))[$language_id];

            $image = $this->load->controller('custom/setting/getValue', array(
                'section' => 'contacts', // Unique section identifier
                'setting' => 'contacts_image', // Unique field identifier
                'page' => 'module_contacts' // Form code in the admin panel
            ));

            $data['image'] = $this->model_tool_image->resize($image, $width, $height);


            $data['topics'] = $this->model_extension_module_contacts->getTopics();

            $data['column_left'] = $this->load->controller('common/column_left');
            $data['column_right'] = $this->load->controller('common/column_right');
            $data['content_top'] = $this->load->controller('common/content_top');
            $data['content_bottom'] = $this->load->controller('common/content_bottom');
            $data['footer'] = $this->load->controller('common/footer');
            $data['header'] = $this->load->controller('common/header');
            $data['menu'] = $this->load->controller('common/menu');

            $this->response->setOutput($this->load->view('extension/module/contacts', $data));
        }
    }

    public function addRequest() {
        $json = [];
        if ($_SERVER['REQUEST_METHOD'] != 'POST' || !$this->validate()) {
            $this->error['warning'] = _e('Error: wrong request');
            $json['error'] = $this->error;
            $this->response->addHeader('Content-Type: application/json');
            return $this->response->setOutput(json_encode($json));
        }

        $this->load->model('extension/module/contacts');
        $id = $this->model_extension_module_contacts->addRequest($this->request->post);
        $json['success'] = true;
        $json['data'] = ['id' => $id];
        $json['error'] = [];

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($json));
    }

    private function validate() {
        if (empty($this->request->post['email']) || !isset($this->request->post['email'])) {
            $this->error['email'] = _e("Error: no email provided!");
        }

        if (empty($this->request->post['full_name']) || !isset($this->request->post['full_name'])) {
            $this->error['full_name'] = _e("Error: Full name is empty!");
        }

        if (empty($this->request->post['phone']) || !isset($this->request->post['phone'])) {
            $this->error['phone'] = _e("Error: no phone provided!");
        }

        if (empty($this->request->post['topic_id']) || !isset($this->request->post['topic_id'])) {
            $this->error['topic_id'] = _e("Error: no topic provided!");
        }

        if (!$this->request->post['agree']) {
            $this->error['agree'] = _e('You must to agree!');
        }

        return !$this->error;
    }
}
