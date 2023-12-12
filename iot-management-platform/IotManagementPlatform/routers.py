class DBRouter:
   
    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'device_management' and model._meta.model_name == "devicedata":
            return 'timescala'
        return "default"
        

    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'device_management' and model._meta.model_name == "devicedata":
            return 'timescala'
        return "default"

    def allow_relation(self, obj1, obj2, **hints):
        db_set = {"timescala", "default"}
        if obj1._state.db in db_set and obj2._state.db in db_set:
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):    
        if app_label == "device_management" and model_name == "devicedata":
            return  db == "timescala"
        else:
            return db == "default"
        return None

        