from google.cloud import firestore

def login(username, password):
    db = firestore.Client()
    user_doc_ref = db.collection('users').document(username)
    user_doc = user_doc_ref.get()
    if user_doc.exists:
        user_dict = user_doc.to_dict()
        if password == user_dict['password']:
            return True, "VERY SECURE TOKEN"
        else:
            return False, "PASSWORD_MISMATCH"
    else:
            return False, "USERNAME_NOT_FOUND"