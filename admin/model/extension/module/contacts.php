<?php

class ModelExtensionModuleContacts extends Model {
    public function install() {
        $this->db->query("CREATE TABLE IF NOT EXISTS `".DB_PREFIX."contacts` (
            `id` INT(11) NOT NULL AUTO_INCREMENT,
            `email` VARCHAR (50) NOT NULL,
            `full_name` VARCHAR (50) NOT NULL,
            `phone` VARCHAR (20) NOT NULL,
            `device` VARCHAR (50) NOT NULL,
            `esim_iccid` VARCHAR (100) NOT NULL,
            `topic_id` INT (3) NOT NULL,
            `message` TEXT NOT NULL,
            `date_added` DATETIME NOT NULL,
            PRIMARY KEY (`id`)
        ) ENGINE=INNODB;");

        $this->db->query("CREATE TABLE IF NOT EXISTS `".DB_PREFIX."contacts_topics` (
            `id` INT(11) NOT NULL AUTO_INCREMENT,
            `language_id` INT(3) NOT NULL,
            `name` VARCHAR (50) NOT NULL,
            PRIMARY KEY (`id`, `language_id`)
        ) ENGINE=INNODB;");
    }

    public function uninstall() {
        $this->db->query("DROP TABLE IF EXISTS `".DB_PREFIX."contacts`");
        $this->db->query("DROP TABLE IF EXISTS `".DB_PREFIX."contacts_topics`");
    }

    public function addTopic($data) {
        $id = false;
        foreach ($data as $language_id => $name) {
            $set_data = [
                'name' => $this->db->escape($name['name']),
                'language_id' => (int)$language_id
            ];

            if ($id) {
                $set_data['id'] = $id;
            }

            $insert_sql = '';
            foreach ($set_data as $key => $value) {
                $insert_sql .= sprintf("`%s` = '%s'", $key, $value) . ', ';
            }

            $this->db->query("INSERT INTO `" . DB_PREFIX . "contacts_topics` SET " . trim($insert_sql, " ,"));
            $id = $this->db->getLastId();
        }
    }

    public function getTopics() {
        $query = $this->db->query("SELECT * FROM `" . DB_PREFIX . "contacts_topics`");

        return $query->rows ?? [];
    }

    public function getTopic($id) {
        $topics = $this->db->query("SELECT * FROM `" . DB_PREFIX . "contacts_topics` WHERE `id` = '".$id."'")->rows ?? [];

        $return = [];
        foreach ($topics as $topic) {
            $return[$topic['language_id']] = $topic;
        }

        return $return;
    }

    public function deleteTopic($id) {
        $this->db->query("DELETE FROM `" . DB_PREFIX . "contacts_topics` WHERE `id` = '" . (int)$id . "'");
    }

    public function getRequests($filter) {
        $where = [];
        $join = [];

        if (isset($filter['filter_topic_id'])) {
            $where[] = " c.`topic_id` = '" . (int)$filter['filter_topic_id'] . "'";
        }

        if (isset($filter['filter_email'])) {
            $where[] = " c.`email` LIKE '" . $this->db->escape($filter['filter_email']) . "%'";
        }

        if (isset($filter['filter_date_added'])) {
            $where[] = " DATE(c.`date_added`) = DATE('" . $this->db->escape($filter['filter_date_added']) . "')";
        }

        $where[] = "ct.language_id = '" . $this->config->get('config_language_id')  . "'";

        $where_query = " WHERE " . implode(' AND ', $where);

        $start = 0;
        $limit = 20;

        if (isset($filter['start']) && $filter['start'] >= 0) {
            $start = $filter['start'];
        }

        if (isset($filter['limit']) && $filter['limit'] >= 0) {
            $limit = $filter['limit'];
        }

        $limit_query = sprintf("LIMIT %s, %s", $start, $limit);

        $join[] = "LEFT JOIN `" . DB_PREFIX . "contacts_topics` ct ON (ct.id = c.topic_id)";
        $sql = "SELECT c.*, ct.name as `topic_name` FROM `" . DB_PREFIX . "contacts` c " . implode(' ', $join) . $where_query . "ORDER BY c.`date_added` DESC " . $limit_query;

        return $this->db->query($sql)->rows ?? [];
    }

    public function getTotalRequests($filter) {
        $where = [];
        $join = [];

        if (isset($filter['filter_topic_id'])) {
            $where[] = " c.`topic_id` = '" . (int)$filter['filter_topic_id'] . "'";
        }

        if (isset($filter['filter_email'])) {
            $where[] = " c.`email` LIKE '" . $this->db->escape($filter['filter_email']) . "%'";
        }

        if (isset($filter['filter_date_added'])) {
            $where[] = " DATE(c.`date_added`) = DATE('" . $this->db->escape($filter['filter_date_added']) . "')";
        }

        $where[] = "ct.language_id = '" . $this->config->get('config_language_id')  . "'";

        $where_query = " WHERE " . implode(' AND ', $where);

        $limit_query = '';

        $join[] = "LEFT JOIN `" . DB_PREFIX . "contacts_topics` ct ON (ct.id = c.topic_id)";
        $sql = "SELECT COUNT(*) as `total` FROM `" . DB_PREFIX . "contacts` c " . implode(' ', $join) . $where_query . "ORDER BY c.`date_added` DESC " . $limit_query;

        return $this->db->query($sql)->row['total'] ?? 0;
    }

    public function getRequest($id) {
        return $this->db->query("SELECT c.*, ct.name as `topic_name` FROM `" . DB_PREFIX . "contacts` c LEFT JOIN `" . DB_PREFIX . "contacts_topics` ct ON (ct.id = c.topic_id) WHERE c.id = '" . (int)$id . "' AND ct.language_id = '" . $this->config->get('config_language_id') . "'")->row;
    }

    public function deleteRequest($id) {
        $this->db->query("DELETE FROM `" . DB_PREFIX ."contacts` WHERE `id` = '".$id."'");
    }
}