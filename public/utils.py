def jsend_response(success:bool, payload:dict):
    return {
        'status': 'success' if success else 'failure',
        'data': payload
    }
    