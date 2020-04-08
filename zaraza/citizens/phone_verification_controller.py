from random import randint
from telesign.messaging import MessagingClient

from citizens.apps import logger


class PhoneVerificationController:

    __instance = None

    def __init__(self):
        if PhoneVerificationController.__instance:
            raise Exception("Phone number controller already exists !")
        PhoneVerificationController.__instance = self

    @staticmethod
    def get_instance():
        if PhoneVerificationController.__instance is None:
            PhoneVerificationController()
        return PhoneVerificationController.__instance

    def send_verification_message(self, phone_number):
        code = randint(0, 32767)
        logger.info(f"Verification code {code} sent to number {phone_number}")
        customer_id = "69544248-FA9E-4EDA-8D83-39D7B7801229"
        api_key = "3d8CYjHUezxZwYCcwqGJRA1J4nv8JTU6WzVEGZKEXf37TyyZiQdmOnipnEy3opvdu5ioW6cpeadU7S1s1PdiNA=="

        verify_code = str(code).zfill(5)

        message = "Your code is {}".format(verify_code)
        message_type = "OTP"

        messaging = MessagingClient(customer_id, api_key)
        # response = messaging.message(phone_number, message, message_type)
        # if response.ok:
        return code
        # raise Exception("Failed to deliver message")
