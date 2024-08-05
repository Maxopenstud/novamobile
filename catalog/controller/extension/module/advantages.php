<?php

class ControllerExtensionModuleAdvantages extends Controller {

    public function index($setting) {
        if ($setting['status']) {
            $data = $this->load->language('extension/module/advantages');

            $data['name'] = $setting['name'];

            $language_id = $this->config->get("config_language_id");

            $about_us = $setting['custom_setting']['about_us'];

            $data['title'] = $about_us['au_title'][$language_id];
            $data['text'] = html_entity_decode($about_us['au_text_editor'][$language_id], ENT_QUOTES, 'UTF-8');

            $data['link'] = [
                'name' => $about_us['au_advantages_link'][0]['au_title'][$language_id],
                'href' => $about_us['au_advantages_link'][0]['au_subtitle'][$language_id],
            ];

            foreach ($about_us['au_advantages_block'] as $advantage) {
                $data['advantages'][] = [
                    'title' => $advantage['au_title'][$language_id],
                    'description' => html_entity_decode($advantage['au_description'][$language_id], ENT_QUOTES, 'UTF-8')
                ];
            }

            return $this->load->view('extension/module/advantages', $data);
        }
    }

}
