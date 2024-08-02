<?php

class ControllerExtensionModuleHowItWorks extends Controller {

    public function index($setting) {
        if ($setting['status']) {
            $data = $this->load->language('extension/module/how_it_works');

            $language_id = $this->config->get('config_language_id');

            $data['name'] = $setting['name'];

            $block = $setting['custom_setting']['how_it_works']['hiw_block'];

            $width = $setting['custom_setting']['how_it_works']['hiw_width'];
            $height = $setting['custom_setting']['how_it_works']['hiw_height'];

            $contour_image = $setting['custom_setting']['how_it_works']['hiw_contour'];

            $this->load->model('tool/image');

            $data['contour_image'] = $this->model_tool_image->resize($contour_image, $width, $height);
            $data['title'] = $setting['custom_setting']['how_it_works']['hiw_module_title'][$language_id];

            foreach ($block as $row) {
                $data['steps'][] = [
                    'title' => $row['hiw_title'][$language_id],
                    'subtitle' => $row['hiw_subtitle'][$language_id],
                ];
                $data['images'][] = $this->model_tool_image->resize($row['hiw_image'], $width, $height);
            }

            return $this->load->view('extension/module/how_it_works', $data);
        }
    }

}
