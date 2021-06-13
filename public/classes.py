from google.cloud import firestore

def list_classes():
    db = firestore.Client()
    classes = db.collection('classes').stream()
    # not sending back entire document, just sending back id and name
    return [{'id':clazz.id, 'name':clazz.get('name')} for clazz in classes]

def get_class(class_id:str):
    pass

def create_class(class_dict:dict):
    pass

def update_class(class_dict:dict):
    pass

def delete_class(class_id:str):
    pass