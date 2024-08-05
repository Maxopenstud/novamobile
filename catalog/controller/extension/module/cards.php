<?php

class ControllerExtensionModuleCards extends Controller {

    public function index($setting) {
        if ($setting['status']) {
            $data = $this->load->language('extension/module/cards');

            $data['name'] = $setting['name'];

            $block = $setting['custom_setting']['about_us']['au_cards_block'];

            $width = $setting['image_width'] ?? 50;
            $height = $setting['image_height'] ?? 50;

            $data['width'] = $width;
            $data['height'] = $height;

            $language_id = $this->config->get('config_language_id');
            $this->load->model('tool/image');

            foreach ($block as $card) {
                $data['cards'][] = [
                    'title' => $card['au_title'][$language_id],
                    'description' => html_entity_decode($card['au_description'][$language_id], ENT_QUOTES, 'UTF-8'),
                    'image' => $this->model_tool_image->resize($card['au_image'], $width, $height)
                ];
            }

            return $this->load->view('extension/module/cards', $data);
        }
    }

}
