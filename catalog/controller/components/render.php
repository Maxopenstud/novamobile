<?php

class ControllerComponentsRender extends Controller
{
    public function render(string $component, $data = [])
    {
        return $this->load->view('components/' . $component, $data);
    }

    public function social_links() {
        $language_id = $this->config->get('config_language_id');
        $social_link = $this->load->controller('custom/setting/getValue', array(
			'section' => 'menu', // Unique section identifier
			'setting' => 'menu_social', // Unique field identifier
			'page' => 'setting' // Form code in the admin panel
		)) ?? [];

		$data = [];

        $this->load->model('tool/image');

		foreach ($social_link as $block) {
			$icon = $this->model_tool_image->resize($block['menu_image'], 100, 100);
			$link = $block['menu_link_soc'][$language_id];
			
            $data['social_links'][] = [
                'icon' => $icon,
                'link' => $link
            ];
		}

        return $this->render('social_links', $data);
    }
}