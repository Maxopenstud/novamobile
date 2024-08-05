<?php

class ControllerExtensionModuleImageParagraph extends Controller {

    public function index($setting) {
        if ($setting['status']) {
            $data = $this->load->language('extension/module/image_paragraph');

            $data['name'] = $setting['name'];
            $data['title'] = $setting['title'][$this->config->get('config_language_id')];
            $data['image_width'] = $setting['image_width'];
            $data['image_height'] = $setting['image_height'];

            $language_id = $this->config->get('config_language_id');

            $this->load->model('tool/image');

            $data['text'] = html_entity_decode($setting['custom_setting']['about_us']['au_text_editor'][$language_id], ENT_QUOTES, 'UTF-8');
            $data['image'] = $this->model_tool_image->resize($setting['custom_setting']['about_us']['au_image'], $data['image_width'], $data['image_width']);

            if (isset($data['title'])) {
                $data['heading_title'] = $data['title'];
            }
            return $this->load->view('extension/module/image_paragraph', $data);
        }
    }

}
