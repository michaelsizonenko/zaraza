
class PhoneNumberController:

    __instance = None

    storage = {

    }

    def __init__(self):
        if PhoneNumberController.__instance:
            raise Exception("Phone number controller already exists !")
        PhoneNumberController.__instance = self

    @staticmethod
    def get_instance():
        if PhoneNumberController.__instance is None:
            PhoneNumberController()
        return PhoneNumberController.__instance
