from google.cloud import firestore

def list_reqquest(user_id):
    """
    We use the class id mainly to list the projects but we also use it to get
    the class doc so that we can return the name, which we need for the breadcrumbs.
    """
    db = firestore.Client()
    # user_doc_ref = db.collection('users/'+user_id+"/reqquest").add(reqquest_dict)
    # class_doc = class_doc_ref.get()
    # class_name = class_doc.get('name')
    reqquest = db.collection('users/'+user_id+"/request").stream()

    # not sending back entire document, just sending back id and name
    return [
        {"id": req.id,"comment": req.get("comment"),
            "PickUp": req.get("PickUp"), "DropOff": req.get("DropOff"),
            } for req in reqquest
        
        ]


def get_reqquest(class_id:str, appointments_id:str):
    db = firestore.Client()
    appointment_doc_ref = db.document('classes/' + class_id + '/appointments/' + appointment_id)
    appointment_doc = project_doc_ref.get()
    return appointments_doc.to_dict()

def create_reqquest(user_id:str, reqquest_dict:dict):
    db = firestore.Client()
    user_doc_ref = db.collection('users/'+user_id+"/request").add(reqquest_dict)
    

def update_appointment(class_id:str, appointments_dict:dict):
    db = firestore.Client()
    doc_ref = db.collection('users/'+user_id+"/request").document(reqquest_dict)
    doc_ref.set(task_dict)

def delete_reqquest(class_id:str, appointments_id:str):
     db = firestore.Client()
     user_doc_ref = db.collection('users/'+user_id+"/request").add(reqquest_dict)


# # utility functions

def validate_request_from_frontend(reqquest_dict):
    comment = reqquest_dict['comment']
    PickUpDate = datetime.strptime(reqquest_dict['PickUpDate'], '%m/%d/%Y')
    DropOffDate = datetime.strptime(reqquest_dict['DropOffDate'], '%m/%d/%Y')

    reqquest_dict = {
        'comment': comment,
        'PickUpDate': reqquest_dict['PickUpDate'].strftime('%m/%d/%Y'),
        'DropOffDate': reqquest_dict['DropOffDate'].strftime('%m/%d/%Y')

    }
    return reqquest_dict

def make_reqquest_for_frontend(reqquest_dict):
    return {
        'comment': reqquest_dict['comment'],
        'PickUpDate': reqquest_dict['PickUpDate'].strftime('%m/%d/%Y'),
        'DropOffDate': reqquest_dict['DropOffDate'].strftime('%m/%d/%Y')
     }