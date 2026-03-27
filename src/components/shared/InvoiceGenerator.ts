import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export const generateInvoicePDF = async (
  orderData: any,
  action: "download" | "view" | "share" = "download"
) => {
  try {
    if (!orderData) return;

    const formatDate = (date: string) => {
      const d = new Date(date);
      return d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    };

    const items = orderData?.orderItems || [];

    const asset = Asset.fromModule(
      require("@/assets/images/logo.jpeg")
    );

    await asset.downloadAsync();

    const base64Logo = await FileSystem.readAsStringAsync(
      asset.localUri!,
      {
        encoding: FileSystem.EncodingType.Base64,
      }
    );

    const logo = `data:image/jpeg;base64,${base64Logo}`;

    const html = `
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 24px;
            color: #111;
            background: #fff;
          }

          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #eee;
            padding-bottom: 12px;
          }

          .logo {
            height: 70px;
            width: auto;
          }

          h1 {
            margin: 0;
            font-size: 22px;
          }

          .section {
            margin-top: 24px;
          }

          .box {
            border: 1px solid #e5e5e5;
            padding: 12px;
            border-radius: 6px;
            background: #fafafa;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
          }

          th {
            background: #f7f7f7;
            text-align: left;
            padding: 12px;
            font-size: 13px;
            border-bottom: 1px solid #ddd;
          }

          td {
            padding: 12px;
            border-bottom: 1px solid #eee;
            font-size: 13px;
          }

          .right {
            text-align: right;
          }

          tr:last-child td {
            border-bottom: none;
          }

          tr:nth-last-child(1) td {
            font-weight: bold;
            font-size: 15px;
            border-top: 2px solid #ddd;
            background: #fafafa;
          }

          tr:nth-last-child(2) td,
          tr:nth-last-child(3) td,
          tr:nth-last-child(4) td,
          tr:nth-last-child(5) td {
            background: #fcfcfc;
          }

          .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #777;
          }
        </style>
      </head>

      <body>

        <div class="header">
          <img class="logo" src="${logo}" />

          <div style="text-align:right;">
            <h1>Invoice</h1>
            <p><strong>Order ID:</strong> ${orderData?.id}</p>
            <p><strong>Date:</strong> ${formatDate(orderData?.createdOn)}</p>
            <p><strong>Status:</strong> ${orderData?.orderStatusString}</p>
          </div>
        </div>

        <div class="section">
          <h3 style="margin-bottom:10px;">Shipping Address</h3>
          <div class="box">
            <p><strong>${orderData?.shippingAddress?.contactName || ""}</strong></p>
            <p>${orderData?.shippingAddress?.addressLine1 || ""}</p>
            <p>
              ${orderData?.shippingAddress?.cityName || ""}, 
              ${orderData?.shippingAddress?.stateOrProvinceName || ""}
            </p>
            <p>${orderData?.shippingAddress?.zipCode || ""}</p>
            <p>Phone: ${orderData?.shippingAddress?.phone || ""}</p>
          </div>
        </div>

        <div class="section">
          <h3 style="margin-bottom:10px;">Items Ordered</h3>

          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th class="right">Price</th>
                <th class="right">Qty</th>
                <th class="right">Discount</th>
                <th class="right">Tax</th>
                <th class="right">Total</th>
              </tr>
            </thead>

            <tbody>
              ${items
                .map((item: any) => {
                  const price = Number(item.productPrice || 0);
                  const qty = Number(item.quantity || 0);

                  const itemTotal = price * qty;
                  const itemDiscount = Number(item.discountAmount || 0);
                  const itemTax = Number(item.taxAmount || 0);

                  const finalTotal =
                    itemTotal - itemDiscount + itemTax;

                  return `
                    <tr>
                      <td>${item.productName}</td>
                      <td class="right">₹${price.toFixed(2)}</td>
                      <td class="right">${qty}</td>
                      <td class="right">₹${itemDiscount.toFixed(2)}</td>
                      <td class="right">₹${itemTax.toFixed(2)}</td>
                      <td class="right">₹${finalTotal.toFixed(2)}</td>
                    </tr>
                  `;
                })
                .join("")}

              <tr>
                <td colspan="5" class="right"><strong>Subtotal</strong></td>
                <td class="right">
                  ₹${
                    (
                      Number(orderData?.subTotal) ||
                      items.reduce(
                        (acc: number, item: any) =>
                          acc +
                          Number(item.productPrice || 0) *
                            Number(item.quantity || 0),
                        0
                      )
                    ).toFixed(2)
                  }
                </td>
              </tr>

              ${
                orderData?.discountAmount
                  ? `
                <tr>
                  <td colspan="5" class="right"><strong>Discount</strong></td>
                  <td class="right">-₹${Number(
                    orderData.discountAmount
                  ).toFixed(2)}</td>
                </tr>
              `
                  : ""
              }

              <tr>
                <td colspan="5" class="right"><strong>Shipping</strong></td>
                <td class="right">₹${Number(
                  orderData?.shippingAmount || 0
                ).toFixed(2)}</td>
              </tr>

              <tr>
                <td colspan="5" class="right"><strong>Tax</strong></td>
                <td class="right">₹${Number(
                  orderData?.taxAmount || 0
                ).toFixed(2)}</td>
              </tr>

              <tr>
                <td colspan="5" class="right"><strong>Grand Total</strong></td>
                <td class="right">
                  <strong>
                    ₹${(
                      Number(orderData?.orderTotal) ||
                      (
                        (Number(orderData?.subTotal) ||
                          items.reduce(
                            (acc: number, item: any) =>
                              acc +
                              Number(item.productPrice || 0) *
                                Number(item.quantity || 0),
                            0
                          )) -
                        Number(orderData?.discountAmount || 0) +
                        Number(orderData?.shippingAmount || 0) +
                        Number(orderData?.taxAmount || 0)
                      )
                    ).toFixed(2)}
                  </strong>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        <div class="footer">
          <p>Thank you for shopping with us!</p>
          <p>This is a system-generated invoice.</p>
        </div>

      </body>
    </html>
    `;

    const { uri } = await Print.printToFileAsync({ html });

    const filePath =
      FileSystem.cacheDirectory + `Order_${orderData?.id}.pdf`;

    await FileSystem.copyAsync({
      from: uri,
      to: filePath,
    });

    // ✅ FIXED: Use Print.printAsync for in-app PDF preview (works on both iOS & Android)
    if (action === "view") {
      await Print.printAsync({ uri: filePath });
      return;
    }

    if (action === "share") {
      const available = await Sharing.isAvailableAsync();

      if (!available) {
        showErrorToast("Sharing not available");
        return;
      }

      await Sharing.shareAsync(filePath);
      return;
    }

    const permissions =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (!permissions.granted) {
      showErrorToast("Permission denied");
      return;
    }

    const pdfBase64 = await FileSystem.readAsStringAsync(filePath, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const fileUri =
      await FileSystem.StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        `Order_${orderData?.id}.pdf`,
        "application/pdf"
      );

    await FileSystem.writeAsStringAsync(fileUri, pdfBase64, {
      encoding: FileSystem.EncodingType.Base64,
    });

    showSuccessToast("Invoice downloaded successfully!");
  } catch (error) {
    console.log("PDF Error:", error);
    showErrorToast("Failed to generate invoice");
  }
};