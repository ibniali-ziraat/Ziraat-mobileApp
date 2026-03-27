import { Button, View } from "react-native";
import { generateInvoicePDF } from "./InvoiceGenerator";

const InvoiceButton = ({ orderData }: any) => {
  return (
    <View style={{ gap: 10 }}>
      <Button
        title="Download Invoice"
        onPress={() => generateInvoicePDF(orderData, "download")}
      />

      <Button
        title="View Invoice"
        onPress={() => generateInvoicePDF(orderData, "view")}
      />

      <Button
        title="Share Invoice"
        onPress={() => generateInvoicePDF(orderData, "share")}
      />
    </View>
  );
};

export default InvoiceButton;