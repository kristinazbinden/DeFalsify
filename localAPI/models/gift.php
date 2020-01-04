<?php
$dbconn = pg_connect("host=localhost dbname=regiftr");

class Gift {
    public $id;
    public $name;
    public $description;
    public $value;
    public $event_received;
    public $given_by;
        public function __construct($id, $name, $description, $value, $event_received, $given_by) {
            $this->id = $id;
            $this->name = $name;
            $this->description = $description;
            $this->value = $value;
            $this->event_received = $event_received;
            $this->given_by = $given_by;
        }
    }

class Gifts {

// This is our create route

    static function create($gift){
        $query = 'INSERT INTO gifts (name, description, value, event_received, given_by) VALUES ($1, $2, $3, $4, $5)';
        $query_params = array($gift->name, $gift->description, $gift->value, $gift->event_received, $gift->given_by);
        pg_query_params($query, $query_params);

        return self::all();
    }

// This is our show route

    static function all(){

        $gifts = array();

        $results = pg_query("SELECT * FROM gifts");

        $row_object = pg_fetch_object($results);
        while($row_object != false){

            $new_gift = new GIFT(
                intval($row_object->id),
                $row_object->name,
                $row_object->description,
                intval($row_object->value),
                $row_object->event_received,
                $row_object->given_by
            );

            $gifts[] = $new_gift;

            $row_object = pg_fetch_object($results);
        };

        return $gifts;
    }


// This is our update route

    static function update($updated_gift){
        $query = "UPDATE gifts SET name = $1, description = $2, value = $3, event_received = $4, given_by = $5 WHERE id = $6";
        $query_params = array($updated_gift->name, $updated_gift->description, $updated_gift->value, $updated_gift->event_received, $updated_gift->given_by, $updated_gift->id);
        pg_query_params($query, $query_params);
        return self::all();
    }

// This is our delete route

    static function delete($id){
        $query = "DELETE FROM gifts WHERE id = $1";
        $query_params = array($id);
        pg_query_params($query, $query_params);

        return self::all();
    }

}

?>
