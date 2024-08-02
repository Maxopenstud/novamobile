<?php

class ControllerExtensionModuleFaq extends Controller {

    public function index($setting) {
        if ($setting['status']) {
            $data = $this->load->language('extension/module/faq');

            $data['name'] = $setting['name'];

            $language_id = $this->config->get('config_language_id');

            $this->load->model('tool/image');

            $data['title'] = $setting['custom_setting']['faq']['faq_title'][$language_id];
            $width = $setting['custom_setting']['faq']['faq_image_width'];
            $height = $setting['custom_setting']['faq']['faq_image_height'];
            $data['image'] = $this->model_tool_image->resize($setting['custom_setting']['faq']['faq_image'], $width, $height);

            $block = $setting['custom_setting']['faq']['faq_block'];

            foreach ($block as $row) {
                $data['rows'][] = [
                    'title' => $row['faq_block_title'][$language_id],
                    'desc' => $row['faq_block_desc'][$language_id]
                ];
            }

            return $this->load->view('extension/module/faq', $data);
        }
    }

}
