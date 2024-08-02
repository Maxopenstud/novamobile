<?php

class ControllerExtensionModuleWhyChooseUs extends Controller {

    private $version = '1.0';
    private $error = array();
    private $token_var;
    private $extension_var;
    private $prefix;
    private $model_place;

    public function __construct($registry) {
        parent::__construct($registry);
        $this->token_var = (version_compare(VERSION, '3.0', '>=')) ? 'user_token' : 'token';
        $this->extension_var = (version_compare(VERSION, '3.0', '>=')) ? 'marketplace' : 'extension';
        $this->prefix = (version_compare(VERSION, '3.0', '>=')) ? 'module_' : '';
        $this->model_place = (version_compare(VERSION, '3.0', '>=')) ? 'setting' : 'extension';
    }

    public function install() {

    }

    public function uninstall() {

    }

    public function index() {
        $data = $this->load->language('extension/module/why_choose_us');

        $heading_title = preg_replace('/^.*?\|\s?/ius', '', $this->language->get('heading_title'));
        $data['heading_title'] = $heading_title;
        $this->document->setTitle($heading_title);

        $this->load->model($this->model_place . '/module');

        if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {
            if (!isset($this->request->get['module_id'])) {
                $module_id = $this->{'model_' . $this->model_place . '_module'}->addModule('why_choose_us', $this->request->post);
            } else {
                $this->{'model_' . $this->model_place . '_module'}->editModule($this->request->get['module_id'], $this->request->post);
                $module_id = $this->request->get['module_id'];
            }

            $this->session->data['success'] = $this->language->get('text_success');

            if (isset($this->request->post['apply']) && $module_id) {
                $this->response->redirect($this->url->link('extension/module/why_choose_us', $this->token_var . '=' . $this->session->data[$this->token_var] . '&module_id=' . $module_id, true));
            } else {
                $this->response->redirect($this->url->link($this->extension_var . '/extension', $this->token_var . '=' . $this->session->data[$this->token_var] . '&type=module', true));
            }
        }

        if (isset($this->error['warning'])) {
            $data['error_warning'] = $this->error['warning'];
        } else {
            $data['error_warning'] = '';
        }
        if (isset($this->error['name'])) {
            $data['error_name'] = $this->error['name'];
        } else {
            $data['error_name'] = '';
        }
        if (isset($this->error['description'])) {
            $data['error_description'] = $this->error['description'];
        } else {
            $data['error_description'] = '';
        }

        if (isset($this->session->data['success'])) {
            $data['success'] = $this->session->data['success'];
            unset($this->session->data['success']);
        } else {
            $data['success'] = '';
        }

        $data['breadcrumbs'] = array();

        $data['breadcrumbs'][] = array(
            'text' => $this->language->get('text_home'),
            'href' => $this->url->link('common/dashboard', $this->token_var . '=' . $this->session->data[$this->token_var], true)
        );

        $data['breadcrumbs'][] = array(
            'text' => $this->language->get('text_extension'),
            'href' => $this->url->link($this->extension_var . '/extension', $this->token_var . '=' . $this->session->data[$this->token_var] . '&type=module', true)
        );

        if (!isset($this->request->get['module_id'])) {
            $data['breadcrumbs'][] = array(
                'text' => $heading_title,
                'href' => $this->url->link('extension/module/why_choose_us', $this->token_var . '=' . $this->session->data[$this->token_var], true)
            );
        } else {
            $data['breadcrumbs'][] = array(
                'text' => $heading_title,
                'href' => $this->url->link('extension/module/why_choose_us', $this->token_var . '=' . $this->session->data[$this->token_var] . '&module_id=' . $this->request->get['module_id'], true)
            );
        }

        $data['prefix'] = $this->prefix;
        $data['token_var'] = $this->token_var;
        $data[$this->token_var] = $this->session->data[$this->token_var];
        if (!isset($this->request->get['module_id'])) {
            $data['action'] = $this->url->link('extension/module/why_choose_us', $this->token_var . '=' . $this->session->data[$this->token_var], true);
        } else {
            $data['action'] = $this->url->link('extension/module/why_choose_us', $this->token_var . '=' . $this->session->data[$this->token_var] . '&module_id=' . $this->request->get['module_id'], true);
        }
        $data['cancel'] = $this->url->link($this->extension_var . '/extension', $this->token_var . '=' . $this->session->data[$this->token_var] . '&type=module', true);
        $data['text_info'] = sprintf($this->language->get('text_info'), $this->version);

        $this->load->model('localisation/language');
        $languages = $this->model_localisation_language->getLanguages();
        $data['languages'] = $languages;

        if (isset($this->request->get['module_id']) && ($this->request->server['REQUEST_METHOD'] != 'POST')) {
            $module_info = $this->{'model_' . $this->model_place . '_module'}->getModule($this->request->get['module_id']);
        }

        if (isset($this->request->post['name'])) {
            $data['name'] = $this->request->post['name'];
        } elseif (isset($module_info['name'])) {
            $data['name'] = $module_info['name'];
        } else {
            $data['name'] = '';
        }
        if (isset($this->request->post['title'])) {
            $data['title'] = $this->request->post['title'];
        } elseif (isset($module_info['title'])) {
            $data['title'] = $module_info['title'];
        } else {
            $data['title'] = array();
        }
        if (isset($this->request->post['description'])) {
            $data['description'] = $this->request->post['description'];
        } elseif (isset($module_info['description'])) {
            $data['description'] = $module_info['description'];
        } else {
            $data['description'] = array();
        }
        if (isset($this->request->post['status'])) {
            $data['status'] = $this->request->post['status'];
        } elseif (isset($module_info['status'])) {
            $data['status'] = $module_info['status'];
        } else {
            $data['status'] = '';
        }

        $data['header'] = $this->load->controller('common/header');
        $data['column_left'] = $this->load->controller('common/column_left');
        $data['footer'] = $this->load->controller('common/footer');

        $this->response->setOutput($this->load->view('extension/module/why_choose_us', $data));
    }

    protected function validate() {
        if (!$this->user->hasPermission('modify', 'extension/module/why_choose_us')) {
            $this->error['warning'] = $this->language->get('error_permission');
        }

        if (empty($this->request->post['name'])) {
            $this->error['name'] = $this->language->get('error_name');
        }
        foreach ($this->request->post['description'] as $language_id => $value) {
            if (empty($value)) {
                $this->error['description'][$language_id] = $this->language->get('error_description');
            }
        }

        if ($this->error && !isset($this->error['warning'])) {
            $this->error['warning'] = $this->language->get('error_warning');
        }

        return !$this->error;
    }
}
