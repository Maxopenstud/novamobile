<?php

class ControllerExtensionModuleOurTeam extends Controller {

    private $error = array();
    private $prefix;

    public function __construct($registry) {
        parent::__construct($registry);
        $this->prefix = (version_compare(VERSION, '3.0', '>=')) ? 'module_' : '';
        $this->prefix .= 'our_team_';
    }

    public function index() {
        if ($this->config->get($this->prefix . 'status')) {
            $data = $this->load->language('extension/module/our_team');

            $data['title'] = $this->config->get($this->prefix . 'title')[$this->config->get('config_language_id')];
            $data['description'] = html_entity_decode($this->config->get($this->prefix . 'description')[$this->config->get('config_language_id')], ENT_QUOTES, 'UTF-8');

            $width = $this->config->get($this->prefix . 'image_width');
            $height = $this->config->get($this->prefix . 'image_height');

            $language_id = $this->config->get('config_language_id');
            $this->load->model('tool/image');

            $block = $this->load->controller('custom/setting/getValue', array(
                'section' => 'about_us', // Unique section identifier
                'setting' => 'au_team_block', // Unique field identifier
                'page' => 'module_our_team' // Form code in the admin panel
            ));

            foreach ($block as $row) {
                $data['team'][] = [
                    'title' => $row['au_title'][$language_id],
                    'subtitle' => $row['au_subtitle'][$language_id],
                    'description' => $row['au_description'][$language_id],
                    'image' => $this->model_tool_image->resize($row['au_image'], $width, $height)
                ];
            }

            return $this->load->view('extension/module/our_team', $data);
        }
    }

}
