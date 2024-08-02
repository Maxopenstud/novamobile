<?php

class ControllerExtensionModuleWhyChooseUs extends Controller {

    public function index($setting) {
        if ($setting['status']) {
            $data = $this->load->language('extension/module/why_choose_us');

            $language_id = $this->config->get('config_language_id');

            $data['name'] = $setting['name'];
            $data['title'] = $setting['title'][$this->config->get('config_language_id')];
            $data['description'] = html_entity_decode($setting['description'][$this->config->get('config_language_id')], ENT_QUOTES, 'UTF-8');

            $block = $setting['custom_setting']['why_choose_us']['wcu_block'];

            $this->load->model('tool/image');

            foreach ($block as $row) {
                $data['rows'][] = [
                    'title' => $row['wcu_title'][$language_id],
                    'subtitle' => $row['wcu_subtitle'][$language_id],
                    'image' => $this->model_tool_image->resize($row['wcu_image'], 30, 30),
                ];
            }

            return $this->load->view('extension/module/why_choose_us', $data);
        }
    }

}
