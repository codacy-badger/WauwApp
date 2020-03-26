import React from "react";
import paypal from "paypal-rest-sdk";
import { View, Text } from "react-native";

export default function Pago() {
  paypal.configure({
    mode: "sandbox",
    client_id:
      "AbWreDhl9ulTXpqXUGZaWr6Xakkt5n4O1CqWxAbJQTYIqaJviDac_aFbuqForg8E397E27KUEjzsTN_Z",
    client_secret:
      "EME-6Ls-C7cs10uPpNXiBciXt-vLMC48TR1s9FpP3t5mwGNmvHoEavtpjbzINw3z1jNV_D4vkYgglEaX"
  });

  createPayment = () => {
    var create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal"
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: "item",
                sku: "item",
                price: "1.00",
                currency: "USD",
                quantity: 1
              }
            ]
          },
          amount: {
            currency: "USD",
            total: "1.00"
          },
          description: "This is the payment description."
        }
      ]
    };

    paypal.payment.create(create_payment_json, function(error, payment) {
      if (error) {
        throw error;
      } else {
        console.log("Create Payment Response");
        console.log(payment);
      }
    });
  };

  return (
    <View>
      <Text> Pago </Text>
    </View>
  );
}
