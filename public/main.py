from flask import Flask, request, make_response
from google.cloud import firestore
import login 
import classes
import appointments
import auth
import utils

app = Flask(__name__)

# this hardcoded value substitutes for reading projects from a database
projects = [
    { 'id': "1", 'name': 'Leandro Rodriguez -- Trucking Control'},
    { 'id': "2", 'name': 'Sarah Kurien -- Masters of Trivia'},
    { 'id': "3", 'name': 'Papa Diop -- Shoppa'}
]

# removed login_get method that returns the login-page html. Instead using Postman for testing.

# endpoint for logging in. Currently sets cookie, will convert to returning token once we are more
# comfortable with frontend.
@app.route('/login', methods=['POST'])
def login_post():
    credentials = request.get_json()
    # print(f'{credentials["username"]} {credentials["password"]}')
    username = credentials["username"]
    password = credentials["password"]

    success, response_value = auth.login(username, password)
    if success:
        return utils.jsend_response(True, {"authToken": response_value})
    else:
        return utils.jsend_response(False, {"reason": response_value})




@app.route('/classes', methods=['GET'])
def list_classes():
    class_list = classes.list_classes()
    return utils.jsend_response(True, {'classes': class_list})

# REST endpoint for listing projects for given class
@app.route('/reqquest', methods=['GET'])
def list_reqquest():
    reqquest_list = appointments.list_reqquest("tiannalopes@shaw.ca")
    # print(projects)
    return utils.jsend_response(True, { 'reqquest': reqquest_list})

# REST endpoint for creating requests for given class
@app.route('/reqquest', methods=['POST'])
def create_reqquest():
    reqquest_def = request.get_json()
    reqquest_list = appointments.create_reqquest("tiannalopes@shaw.ca",reqquest_def)
    
    # print(projects)
    return utils.jsend_response(True, { 'reqquest': reqquest_list})

# REST endpoint for deleted projects for given class
@app.route('/reqquest', methods=['GET'])
def delete_reqquest():
    reqquest_list = appointments.list_reqquest("tiannalopes@shaw.ca")
    # print(projects)
    return utils.jsend_response(True, {''})

# utility method for sending responses in JSend format
def jsend_response(success:bool, payload:dict):
    return {
        'status': 'success' if success else 'failure',
        'data': payload
    }
#endpoint for updating tasks@app.route("/tasks", methods=['POST'])def create_task():    task_def = request.get_json()    short_descr,long_descr, expected_date=validate_new_task(task_def)    tasks.create_task(short_descr,long_descr,expected_date)    return jsend_response(True, {})def validate_new_task(task_def):    short_descr = task_def['shortDescr']    long_descr = task_def['longDescr']    expected_date = datetime.strptime(task_def['expectedDate'], '%m/%d/%Y')    return short_descr, long_descr, expected_datedef jsend_response(success:bool, payload:dict):    return {        'status': 'success' if success else 'failure',        'data': payload    }

# @app.route('/ssrequest', methods=['POST'])
# def request_sstimes(class_id):
#    auth_token = request.cookies.get('auth_token')
#     if auth_token and auth_token == 'yousetaCookie':
#         return {
#            'status': 'success',
#            'data': {
#                 'date': [
#                     {
#                         'year': "2021",
#                        'month': "January"
#                         'day': "Monday"
#                         'hour': "5:00"
#                         'minute': "0:30"
#                         'morning/night': "am"
#                     },
#                 ]
#             }
#        }
#    else:
#         return {
#             'status': 'fail',
#             'data': { 'message': 'Not authorized' }
#         }
# REST endpoint for listing classes
# # REST endpoint for listing projects for given class
# @app.route('/appointments/<class_id>', methods=['GET'])
# def list_appointments(class_id):
#     auth_token = request.cookies.get('auth_token')
#     if True: #auth_token and auth_token == 'PopeyesCrispyChicken':
#         return jsend_response(True, {'class_id': class_id, 'appointments': appointments})
#     else:
#         return jsend_response(False, {'message': 'Not authorized'})

 

#endpoint for updating tasks
# @app.route("/appointments", methods=['POST'])
# def create_appointment():
#     appointment_def = request.get_json()
#     short_descr,long_descr, expected_date=validate_new_task(task_def)
#     tasks.create_task(short_descr,long_descr,expected_date)
#     return jsend_response(True, {})

def validate_new_appoinntment(task_def):
    short_descr = appointment_def['shortDescr']
    long_descr = appointment_def['longDescr']
    expected_date = datetime.strptime(appointment_def['expectedDate'], '%m/%d/%Y')
    return short_descr, long_descr, expected_date

def jsend_response(success:bool, payload:dict):
    return {
        'status': 'success' if success else 'failure',
        'data': payload
    }
# copy login form with a button and a click handler that does a post 
#define endpoint 
#eventually-> send dates 
def send_simple_message():
	return requests.post(
		"https://api.mailgun.net/v3/sandboxb9fb4f76116346f3a9a05cc75f447088.mailgun.org/messages",
		auth=("api", "a43f8a1a01b5fbbd938a7ab43cbbfd7b-1553bd45-7c27631f"),
		data={"from": "Mailgun Sandbox <postmaster@sandboxb9fb4f76116346f3a9a05cc75f447088.mailgun.org>",
			"to": "Tianna A Lopes <lopest@student.mville.edu>",
			"subject": "Hello Tianna A Lopes",
			"text": "Congratulations Tianna A Lopes, you just sent an email with Mailgun!  You are truly awesome!"})


 
# this code is needed to run locally
# (or follow the Flask Getting Started guide, but that requires setting an environment variable.)
if __name__ == '__main__':
    app.run(debug=True)


 