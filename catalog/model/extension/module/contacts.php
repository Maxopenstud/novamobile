<?php

class ModelExtensionModuleContacts extends Model {
    public function getTopics() {
        return $this->db->query("SELECT * FROM `" . DB_PREFIX . "contacts_topics` WHERE `language_id` = '" . (int)$this->config->get('config_language_id') . "'")->rows ?? [];
    }

    public function addRequest($data) {
        $set_data = [
            'email' => $this->db->escape($data['email']),
            'full_name' => $this->db->escape($data['full_name']),
            'phone' => $this->db->escape($data['phone']),
            'device' => $this->db->escape($data['device']),
            'esim_iccid' => $this->db->escape($data['esim_iccid']),
            'topic_id' => (int)$data['topic_id'],
            'message' => $this->db->escape($data['message']),
            'date_added' => date('Y-m-d H:i:s')
        ];

        $insert_sql = '';
        foreach ($set_data as $key => $value) {
            $insert_sql .= sprintf("`%s` = '%s'", $key, $value) . ', ';
        }

        $this->db->query("INSERT INTO `" . DB_PREFIX  . "contacts` SET " . trim($insert_sql, ' ,'));

        return $this->db->getLastId();
    }
}