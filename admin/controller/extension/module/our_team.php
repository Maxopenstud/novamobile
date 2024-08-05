<?php

class ControllerExtensionModuleOurTeam extends Controller {

    private $version = '1.0';
    private $error = array();
    private $token_var;
    private $extension_var;
    private $prefix;

    public function __construct($registry) {
        parent::__construct($registry);
        $this->token_var = (version_compare(VERSION, '3.0', '>=')) ? 'user_token' : 'token';
        $this->extension_var = (version_compare(VERSION, '3.0', '>=')) ? 'marketplace' : 'extension';
        $this->prefix = (version_compare(VERSION, '3.0', '>=')) ? 'module_' : '';
    }

    public function install() {

    }

    public function uninstall() {

    }

    public function index() {
        $data = $this->load->language('extension/module/our_team');

        $heading_title = preg_replace('/^.*?\|\s?/ius', '', $this->language->get('heading_title'));
        $data['heading_title'] = $heading_title;
        $this->document->setTitle($heading_title);

        $this->load->model('setting/setting');

        if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {
            $this->model_setting_setting->editSetting($this->prefix . 'our_team', $this->request->post);

            $this->session->data['success'] = $this->language->get('text_success');

            if (isset($this->request->post['apply'])) {
                $this->response->redirect($this->url->link('extension/module/our_team', $this->token_var . '=' . $this->session->data[$this->token_var], true));
            } else {
                $this->response->redirect($this->url->link($this->extension_var . '/extension', $this->token_var . '=' . $this->session->data[$this->token_var] . '&type=module', true));
            }
        }

        if (isset($this->error['warning'])) {
            $data['error_warning'] = $this->error['warning'];
        } else {
            $data['error_warning'] = '';
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

        $data['breadcrumbs'][] = array(
            'text' => $heading_title,
            'href' => $this->url->link('extension/module/our_team', $this->token_var . '=' . $this->session->data[$this->token_var], true)
        );

        $data['prefix'] = $this->prefix;
        $data['token_var'] = $this->token_var;
        $data[$this->token_var] = $this->session->data[$this->token_var];
        $data['action'] = $this->url->link('extension/module/our_team', $this->token_var . '=' . $this->session->data[$this->token_var], true);
        $data['cancel'] = $this->url->link($this->extension_var . '/extension', $this->token_var . '=' . $this->session->data[$this->token_var] . '&type=module', true);
        $data['text_info'] = sprintf($this->language->get('text_info'), $this->version);

        $this->load->model('localisation/language');
        $languages = $this->model_localisation_language->getLanguages();
        $data['languages'] = $languages;

        if (isset($this->request->post[$this->prefix . 'our_team_status'])) {
            $data[$this->prefix . 'our_team_status'] = $this->request->post[$this->prefix . 'our_team_status'];
        } else {
            $data[$this->prefix . 'our_team_status'] = $this->config->get($this->prefix . 'our_team_status');
        }
        if (isset($this->request->post[$this->prefix . 'our_team_title'])) {
            $data[$this->prefix . 'our_team_title'] = $this->request->post[$this->prefix . 'our_team_title'];
        } else {
            $data[$this->prefix . 'our_team_title'] = $this->config->get($this->prefix . 'our_team_title');
        }
        if (isset($this->request->post[$this->prefix . 'our_team_description'])) {
            $data[$this->prefix . 'our_team_description'] = $this->request->post[$this->prefix . 'our_team_description'];
        } else {
            $data[$this->prefix . 'our_team_description'] = $this->config->get($this->prefix . 'our_team_description');
        }

        $data['image_height'] = $this->request->post[$this->prefix . 'our_team_image_height'] ?? $this->config->get($this->prefix . 'our_team_image_height');
        $data['image_width'] = $this->request->post[$this->prefix . 'our_team_image_width'] ?? $this->config->get($this->prefix . 'our_team_image_width');

        $data['header'] = $this->load->controller('common/header');
        $data['column_left'] = $this->load->controller('common/column_left');
        $data['footer'] = $this->load->controller('common/footer');

        $this->response->setOutput($this->load->view('extension/module/our_team', $data));
    }

    protected function validate() {
        if (!$this->user->hasPermission('modify', 'extension/module/our_team')) {
            $this->error['warning'] = $this->language->get('error_permission');
        }


        if ($this->error && !isset($this->error['warning'])) {
            $this->error['warning'] = $this->language->get('error_warning');
        }

        return !$this->error;
    }
}
