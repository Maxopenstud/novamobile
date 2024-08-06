<?php

class ControllerExtensionModuleContacts extends Controller {

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
        $this->load->model('extension/module/contacts');

        $this->model_extension_module_contacts->install();
    }

    public function uninstall() {
        $this->load->model('extension/module/contacts');

        $this->model_extension_module_contacts->uninstall();
    }

    public function index() {
        $data = $this->load->language('extension/module/contacts');

        $heading_title = preg_replace('/^.*?\|\s?/ius', '', $this->language->get('heading_title'));
        $data['heading_title'] = $heading_title;
        $this->document->setTitle($heading_title);

        $this->load->model('setting/setting');

        if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {
            $this->model_setting_setting->editSetting($this->prefix . 'contacts', $this->request->post);

            $this->session->data['success'] = $this->language->get('text_success');

            if (isset($this->request->post['apply'])) {
                $this->response->redirect($this->url->link('extension/module/contacts', $this->token_var . '=' . $this->session->data[$this->token_var], true));
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
            'href' => $this->url->link('extension/module/contacts', $this->token_var . '=' . $this->session->data[$this->token_var], true)
        );

        $data['prefix'] = $this->prefix;
        $data['token_var'] = $this->token_var;
        $data[$this->token_var] = $this->session->data[$this->token_var];
        $data['action'] = $this->url->link('extension/module/contacts', $this->token_var . '=' . $this->session->data[$this->token_var], true);
        $data['cancel'] = $this->url->link($this->extension_var . '/extension', $this->token_var . '=' . $this->session->data[$this->token_var] . '&type=module', true);
        $data['text_info'] = sprintf($this->language->get('text_info'), $this->version);

        if (isset($this->request->post[$this->prefix . 'contacts_status'])) {
            $data[$this->prefix . 'contacts_status'] = $this->request->post[$this->prefix . 'contacts_status'];
        } else {
            $data[$this->prefix . 'contacts_status'] = $this->config->get($this->prefix . 'contacts_status');
        }

        $data['width'] = $this->request->post[$this->prefix . 'contacts_width'] ?? $this->config->get($this->prefix . 'contacts_width') ?? 0;
        $data['height'] = $this->request->post[$this->prefix . 'contacts_height'] ?? $this->config->get($this->prefix . 'contacts_height') ?? 0;

        $this->load->model('localisation/language');
        $data['languages'] = $this->model_localisation_language->getLanguages();

        $data['header'] = $this->load->controller('common/header');
        $data['column_left'] = $this->load->controller('common/column_left');
        $data['footer'] = $this->load->controller('common/footer');

        $this->response->setOutput($this->load->view('extension/module/contacts', $data));
    }

    protected function validate() {
        if (!$this->user->hasPermission('modify', 'extension/module/contacts')) {
            $this->error['warning'] = $this->language->get('error_permission');
        }


        if ($this->error && !isset($this->error['warning'])) {
            $this->error['warning'] = $this->language->get('error_warning');
        }

        return !$this->error;
    }

    public function requests() {
        if (!isset($this->request->get['id'])) {
            $this->requests_list();
        } else {
            $this->request($this->request->get['id']);
        }
    }

    private function requests_list() {
        $data = $this->load->language('extension/module/contacts');

        $heading_title = preg_replace('/^.*?\|\s?/ius', '', $this->language->get('heading_title'));
        $data['heading_title'] = $heading_title;
        $this->document->setTitle($heading_title);

        $this->load->model('extension/module/contacts');

        if (($this->request->server['REQUEST_METHOD'] == 'POST')) {
            foreach ($this->request->post['selected'] as $id) {
                $this->model_extension_module_contacts->deleteRequest($id);
            }

            $this->session->data['success'] = $this->language->get('text_success');

            $this->response->redirect($this->url->link('extension/module/contacts/topics', $this->token_var . '=' . $this->session->data[$this->token_var], true));
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

        $url = $this->token_var . '=' . $this->session->data[$this->token_var];
        $filter_data = [];

        if (isset($this->request->get['filter_topic_id']) && !empty($this->request->get['filter_topic_id'])) {
            $filter_data['filter_topic_id'] = $this->request->get['filter_topic_id'];
            $url .= '&filter_topic_id=' . $this->request->get['filter_topic_id'];
            $data['filter_topic_id'] = $this->request->get['filter_topic_id'];
        }

        if (isset($this->request->get['filter_email']) && !empty($this->request->get['filter_email'])) {
            $filter_data['filter_email'] = $this->request->get['filter_email'];
            $url .= '&filter_email=' . $this->request->get['filter_email'];
            $data['filter_email'] = $this->request->get['filter_email'];
        }

        if (isset($this->request->get['filter_date_added']) && !empty($this->request->get['filter_date_added'])) {
            $filter_data['filter_date_added'] = $this->request->get['filter_date_added'];
            $url .= '&filter_date_added=' . $this->request->get['filter_date_added'];
            $data['filter_date_added'] = $this->request->get['filter_date_added'];
        }

        if (isset($this->request->get['page'])) {
			$page = (int)$this->request->get['page'];
            $url .= '&page='.$page;
		} else {
			$page = 1;
		}

        $limit = 20;
        $filter_data['start'] = ($page - 1) * $limit;
        $filter_data['limit'] = 20;

        $total = $this->model_extension_module_contacts->getTotalRequests($filter_data);
        $requests = $this->model_extension_module_contacts->getRequests($filter_data);
        foreach ($requests as $request) {
            $request['view'] = $this->url->link('extension/module/contacts/requests', $url . '&id='.$request['id']);
            $data['requests'][] = $request;
        }

        $data['topics'] = $this->model_extension_module_contacts->getTopics();

        $pagination = new Pagination();
		$pagination->total = $total;
		$pagination->page = $page;
		$pagination->limit = $this->config->get('config_limit_admin');
		$pagination->url = $this->url->link('catalog/information', 'user_token=' . $this->session->data['user_token'] . $url . '&page={page}', true);

		$data['pagination'] = $pagination->render();

		$data['results'] = sprintf($this->language->get('text_pagination'), ($total) ? (($page - 1) * $this->config->get('config_limit_admin')) + 1 : 0, ((($page - 1) * $this->config->get('config_limit_admin')) > ($total - $this->config->get('config_limit_admin'))) ? $total : ((($page - 1) * $this->config->get('config_limit_admin')) + $this->config->get('config_limit_admin')), $total, ceil($total / $this->config->get('config_limit_admin')));

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
            'href' => $this->url->link('extension/module/contacts', $this->token_var . '=' . $this->session->data[$this->token_var], true)
        );

        $data['prefix'] = $this->prefix;
        $data['token_var'] = $this->token_var;
        $data[$this->token_var] = $this->session->data[$this->token_var];
        $data['action'] = $this->url->link('extension/module/contacts/requests', $this->token_var . '=' . $this->session->data[$this->token_var], true);
        $data['cancel'] = $this->url->link($this->extension_var . '/extension', $this->token_var . '=' . $this->session->data[$this->token_var] . '&type=module', true);

        $this->load->model('localisation/language');
        $data['languages'] = $this->model_localisation_language->getLanguages();

        $data['header'] = $this->load->controller('common/header');
        $data['column_left'] = $this->load->controller('common/column_left');
        $data['footer'] = $this->load->controller('common/footer');

        $this->response->setOutput($this->load->view('extension/module/contacts_requests_list', $data));
    }

    private function request($id) {
        $data = $this->load->language('extension/module/contacts');

        $heading_title = preg_replace('/^.*?\|\s?/ius', '', $this->language->get('heading_title'));
        $data['heading_title'] = $heading_title;
        $this->document->setTitle($heading_title);

        $this->load->model('extension/module/contacts');

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

        $data['request'] = $this->model_extension_module_contacts->getRequest($id);

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
            'href' => $this->url->link('extension/module/contacts', $this->token_var . '=' . $this->session->data[$this->token_var], true)
        );

        $data['prefix'] = $this->prefix;
        $data['token_var'] = $this->token_var;
        $data[$this->token_var] = $this->session->data[$this->token_var];
        $data['cancel'] = $this->url->link('extension/module/contacts/requests', $this->token_var . '=' . $this->session->data[$this->token_var], true);

        $this->load->model('localisation/language');
        $data['languages'] = $this->model_localisation_language->getLanguages();

        $data['header'] = $this->load->controller('common/header');
        $data['column_left'] = $this->load->controller('common/column_left');
        $data['footer'] = $this->load->controller('common/footer');

        $this->response->setOutput($this->load->view('extension/module/contacts_request_form', $data));
    }

    public function topics() {
        if (!isset($this->request->get['id'])) {
            $this->topics_list();
        } else {
            $this->topic_form($this->request->get['id']);
        }
    }

    private function topics_list() {
        $data = $this->load->language('extension/module/contacts');

        $heading_title = preg_replace('/^.*?\|\s?/ius', '', $this->language->get('heading_title'));
        $data['heading_title'] = $heading_title;
        $this->document->setTitle($heading_title);

        $this->load->model('extension/module/contacts');

        if (($this->request->server['REQUEST_METHOD'] == 'POST')) {
            foreach ($this->request->post['selected'] as $id) {
                $this->model_extension_module_contacts->deleteTopic($id);
            }

            $this->session->data['success'] = $this->language->get('text_success');

            $this->response->redirect($this->url->link('extension/module/contacts/topics', $this->token_var . '=' . $this->session->data[$this->token_var], true));
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

        $language_id = $this->config->get('config_language_id');

        $topics = $this->model_extension_module_contacts->getTopics();
        foreach ($topics as $topic) {
            if ($topic['language_id'] == $language_id) {
                $topic['edit'] = $this->url->link('extension/module/contacts/topics', $this->token_var . '=' . $this->session->data[$this->token_var] . '&id='.$topic['id'], true);
                $data['topics'][] = $topic;
            }
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
            'href' => $this->url->link('extension/module/contacts', $this->token_var . '=' . $this->session->data[$this->token_var], true)
        );

        $data['prefix'] = $this->prefix;
        $data['token_var'] = $this->token_var;
        $data[$this->token_var] = $this->session->data[$this->token_var];
        $data['action'] = $this->url->link('extension/module/contacts/topics', $this->token_var . '=' . $this->session->data[$this->token_var], true);
        $data['cancel'] = $this->url->link($this->extension_var . '/extension', $this->token_var . '=' . $this->session->data[$this->token_var] . '&type=module', true);

        $this->load->model('localisation/language');
        $data['languages'] = $this->model_localisation_language->getLanguages();

        $data['header'] = $this->load->controller('common/header');
        $data['column_left'] = $this->load->controller('common/column_left');
        $data['footer'] = $this->load->controller('common/footer');

        $this->response->setOutput($this->load->view('extension/module/contacts_topics_list', $data));
    }

    public function topic_form($id = false) {
        $data = $this->load->language('extension/module/contacts');

        $heading_title = preg_replace('/^.*?\|\s?/ius', '', $this->language->get('heading_title'));
        $data['heading_title'] = $heading_title;
        $this->document->setTitle($heading_title);

        $this->load->model('extension/module/contacts');

        if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validateTopicForm()) {
            $this->model_extension_module_contacts->addTopic($this->request->post['topic']);

            $this->session->data['success'] = $this->language->get('text_success');

            if (isset($this->request->post['apply'])) {
                $this->response->redirect($this->url->link('extension/module/contacts/topics', $this->token_var . '=' . $this->session->data[$this->token_var], true));
            } else {
                $this->response->redirect($this->url->link('extension/module/contacts', $this->token_var . '=' . $this->session->data[$this->token_var], true));
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

        if ($id) {
            $data['topic'] = $this->model_extension_module_contacts->getTopic($id);
        }

        $data['error_name'] = $this->error['error_name'] ?? [];

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
            'href' => $this->url->link('extension/module/contacts', $this->token_var . '=' . $this->session->data[$this->token_var], true)
        );

        $data['prefix'] = $this->prefix;
        $data['token_var'] = $this->token_var;
        $data[$this->token_var] = $this->session->data[$this->token_var];
        $data['action'] = $this->url->link('extension/module/contacts/topic_form', $this->token_var . '=' . $this->session->data[$this->token_var], true);
        $data['cancel'] = $this->url->link($this->extension_var . '/extension', $this->token_var . '=' . $this->session->data[$this->token_var] . '&type=module', true);

        $this->load->model('localisation/language');
        $data['languages'] = $this->model_localisation_language->getLanguages();

        $data['header'] = $this->load->controller('common/header');
        $data['column_left'] = $this->load->controller('common/column_left');
        $data['footer'] = $this->load->controller('common/footer');

        $this->response->setOutput($this->load->view('extension/module/contacts_topic_form', $data));
    }

    private function validateTopicForm() {
        foreach ($this->request->post['topic'] as $language_id => $name) {
            if (trim($name['name']) == '') {
                $this->error['error_name'][$language_id] = _e("Fill the field!");
            }
        }

        return !$this->error;
    }
}
