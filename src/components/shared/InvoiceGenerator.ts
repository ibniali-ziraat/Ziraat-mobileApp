import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";

export const generateInvoicePDF = async (
  orderData: any,
  action: "download" | "view" | "share" = "download"
) => {
  if (!orderData) {
    showErrorToast("Order information is not available");
    return;
  }

  const formatDate = (date?: string) => {
    if (!date) return "";

    const d = new Date(date);

    if (Number.isNaN(d.getTime())) {
      return "";
    }

    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  try {
    const items = orderData?.orderItems || [];
    const vendor = orderData?.vendor;
    const sellerName = vendor?.shopName || vendor?.vendorName || "";

    // ---------------------------------------------------------
    // LOAD LOGO
    // Logo failure should NOT stop invoice generation.
    // ---------------------------------------------------------
    let logo = "";

    try {
      const asset = Asset.fromModule(
        require("@/assets/images/logo.jpeg")
      );

      await asset.downloadAsync();

      const localUri = asset.localUri ?? asset.uri;

      if (localUri) {
        const base64Logo = await FileSystem.readAsStringAsync(localUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        logo = `data:image/jpeg;base64,${base64Logo}`;
      }
    } catch (logoError) {
      console.log(
        "Logo load failed, continuing without logo:",
        logoError
      );
    }

    // ---------------------------------------------------------
    // CALCULATIONS
    // ---------------------------------------------------------

    const calculatedSubtotal = items.reduce(
      (acc: number, item: any) =>
        acc +
        Number(item?.productPrice || 0) *
          Number(item?.quantity || 0),
      0
    );

    const subtotal =
      Number(orderData?.subTotal) ||
      Number(orderData?.subtotal) ||
      calculatedSubtotal;

    const discountAmount = Number(orderData?.discountAmount || 0);
    const shippingAmount = Number(orderData?.shippingAmount || 0);
    const taxAmount = Number(orderData?.taxAmount || 0);

    const grandTotal =
      Number(orderData?.orderTotal) ||
      subtotal - discountAmount + shippingAmount + taxAmount;

    // ---------------------------------------------------------
    // HTML
    // ---------------------------------------------------------

    const html = `
      <html>
        <head>
          <meta charset="utf-8" />

          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              color: #111;
              background: #fff;
            }

            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 2px solid #eee;
              padding-bottom: 10px;
            }

            .logo {
              height: 60px;
              width: auto;
            }

            h1 {
              margin: 0;
              font-size: 20px;
            }

            .section {
              margin-top: 16px;
            }

            .box {
              border: 1px solid #e5e5e5;
              padding: 10px;
              border-radius: 6px;
              background: #fafafa;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
            }

            th {
              background: #f7f7f7;
              text-align: left;
              padding: 9px;
              font-size: 13px;
              border-bottom: 1px solid #ddd;
            }

            td {
              padding: 9px;
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
              margin-top: 20px;
              text-align: center;
              font-size: 12px;
              color: #777;
            }

            tr {
              page-break-inside: avoid;
            }

            .box,
            .footer {
              page-break-inside: avoid;
            }
          </style>
        </head>

        <body>

          <div class="header">

            ${
              logo
                ? `<img class="logo" src="${logo}" />`
                : "<div></div>"
            }

            <div style="text-align:right;">
              <h1>Invoice</h1>

              ${
                sellerName
                  ? `<p><strong>Seller:</strong> ${sellerName}</p>`
                  : ""
              }

              <p>
                <strong>Order ID:</strong>
                ${orderData?.id || ""}
              </p>

              <p>
                <strong>Date:</strong>
                ${formatDate(orderData?.createdOn)}
              </p>

              <p>
                <strong>Status:</strong>
                ${orderData?.orderStatusString || ""}
              </p>

            </div>
          </div>

          ${
            sellerName
              ? `
                <div class="section">
                  <h3 style="margin-bottom:10px;">
                    Sold By
                  </h3>

                  <div class="box">

                    <p>
                      <strong>${sellerName}</strong>
                    </p>

                    ${
                      vendor?.address?.formattedAddress
                        ? `<p>${vendor.address.formattedAddress}</p>`
                        : ""
                    }

                  </div>
                </div>
              `
              : ""
          }

          <div class="section">

            <h3 style="margin-bottom:10px;">
              Shipping Address
            </h3>

            <div class="box">

              <p>
                <strong>
                  ${
                    orderData?.shippingAddress?.contactName ||
                    ""
                  }
                </strong>
              </p>

              <p>
                ${
                  orderData?.shippingAddress?.addressLine1 ||
                  ""
                }
              </p>

              <p>
                ${
                  orderData?.shippingAddress?.cityName ||
                  orderData?.shippingAddress?.city ||
                  ""
                },
                ${
                  orderData?.shippingAddress
                    ?.stateOrProvinceName ||
                  orderData?.shippingAddress
                    ?.stateOrProvince ||
                  ""
                }
              </p>

              <p>
                ${
                  orderData?.shippingAddress?.zipCode ||
                  ""
                }
              </p>

              <p>
                Phone:
                ${
                  orderData?.shippingAddress?.phone ||
                  ""
                }
              </p>

            </div>
          </div>

          <div class="section">

            <h3 style="margin-bottom:10px;">
              Items Ordered
            </h3>

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
                    const price = Number(
                      item?.productPrice || 0
                    );

                    const qty = Number(
                      item?.quantity || 0
                    );

                    const itemTotal = price * qty;

                    const itemDiscount = Number(
                      item?.discountAmount || 0
                    );

                    const itemTax = Number(
                      item?.taxAmount || 0
                    );

                    const finalTotal =
                      itemTotal -
                      itemDiscount +
                      itemTax;

                    return `
                      <tr>

                        <td>
                          ${item?.productName || ""}
                        </td>

                        <td class="right">
                          ₹${price.toFixed(2)}
                        </td>

                        <td class="right">
                          ${qty}
                        </td>

                        <td class="right">
                          ₹${itemDiscount.toFixed(2)}
                        </td>

                        <td class="right">
                          ₹${itemTax.toFixed(2)}
                        </td>

                        <td class="right">
                          ₹${finalTotal.toFixed(2)}
                        </td>

                      </tr>
                    `;
                  })
                  .join("")}

                <tr>
                  <td
                    colspan="5"
                    class="right"
                  >
                    <strong>
                      Subtotal
                    </strong>
                  </td>

                  <td class="right">
                    ₹${subtotal.toFixed(2)}
                  </td>
                </tr>

                ${
                  discountAmount > 0
                    ? `
                      <tr>
                        <td
                          colspan="5"
                          class="right"
                        >
                          <strong>
                            Discount
                          </strong>
                        </td>

                        <td class="right">
                          -₹${discountAmount.toFixed(
                            2
                          )}
                        </td>
                      </tr>
                    `
                    : ""
                }

                <tr>
                  <td
                    colspan="5"
                    class="right"
                  >
                    <strong>
                      Shipping
                    </strong>
                  </td>

                  <td class="right">
                    ₹${shippingAmount.toFixed(2)}
                  </td>
                </tr>

                <tr>
                  <td
                    colspan="5"
                    class="right"
                  >
                    <strong>
                      Tax
                    </strong>
                  </td>

                  <td class="right">
                    ₹${taxAmount.toFixed(2)}
                  </td>
                </tr>

                <tr>
                  <td
                    colspan="5"
                    class="right"
                  >
                    <strong>
                      Grand Total
                    </strong>
                  </td>

                  <td class="right">
                    <strong>
                      ₹${grandTotal.toFixed(2)}
                    </strong>
                  </td>
                </tr>

              </tbody>

            </table>
          </div>

          <div class="footer">
            <p>
              Thank you for shopping with
              ${sellerName || "us"}!
            </p>

            <p>
              This is a system-generated invoice.
            </p>
          </div>

        </body>
      </html>
    `;

    // ---------------------------------------------------------
    // GENERATE PDF
    // ---------------------------------------------------------

    const generatedPdf =
      await Print.printToFileAsync({
        html,
      });

    const filePath =
      FileSystem.cacheDirectory +
      `Order_${orderData?.id}.pdf`;

    // Remove previous cached invoice for same order.
    await FileSystem.deleteAsync(filePath, {
      idempotent: true,
    });

    await FileSystem.copyAsync({
      from: generatedPdf.uri,
      to: filePath,
    });

    // =========================================================
    // VIEW
    // =========================================================

    if (action === "view") {
      try {
        await Print.printAsync({
          uri: filePath,
        });
      } catch (viewError: any) {
        // Closing/dismissing native preview should not
        // show "Failed to generate invoice".
        console.log(
          "Invoice preview closed:",
          viewError?.message
        );
      }

      // IMPORTANT:
      // No success/error toast after simply viewing.
      return;
    }

    // =========================================================
    // SHARE
    // =========================================================

    if (action === "share") {
      const available =
        await Sharing.isAvailableAsync();

      if (!available) {
        showErrorToast(
          "Sharing is not available on this device"
        );
        return;
      }

      try {
        await Sharing.shareAsync(filePath, {
          mimeType: "application/pdf",
          dialogTitle: "Share Invoice",
        });
      } catch (shareError: any) {
        // User may simply close the native share sheet.
        // That is not an invoice generation failure.
        console.log(
          "Invoice share sheet closed:",
          shareError?.message
        );
      }

      // No toast here.
      return;
    }

    // =========================================================
    // DOWNLOAD - ANDROID
    // =========================================================

    if (Platform.OS === "android") {
      try {
        const permissions =
          await FileSystem.StorageAccessFramework
            .requestDirectoryPermissionsAsync();

        if (!permissions.granted) {
          // User cancelled folder selection.
          // Don't call this a PDF generation failure.
          return;
        }

        const pdfBase64 =
          await FileSystem.readAsStringAsync(
            filePath,
            {
              encoding:
                FileSystem.EncodingType.Base64,
            }
          );

        const destinationUri =
          await FileSystem.StorageAccessFramework
            .createFileAsync(
              permissions.directoryUri,
              `Order_${orderData?.id}.pdf`,
              "application/pdf"
            );

        await FileSystem.writeAsStringAsync(
          destinationUri,
          pdfBase64,
          {
            encoding:
              FileSystem.EncodingType.Base64,
          }
        );

        // Only show this AFTER the file has actually
        // been written successfully.
        showSuccessToast(
          "Invoice downloaded successfully!"
        );
      } catch (downloadError) {
        console.log(
          "Invoice download error:",
          downloadError
        );

        showErrorToast(
          "Failed to download invoice"
        );
      }

      return;
    }

    // =========================================================
    // DOWNLOAD - iOS
    // =========================================================

    if (Platform.OS === "ios") {
      const available =
        await Sharing.isAvailableAsync();

      if (!available) {
        showErrorToast(
          "Saving is not available on this device"
        );
        return;
      }

      try {
        /*
         * iOS does not provide Android's
         * StorageAccessFramework.
         *
         * The share sheet lets the user choose
         * "Save to Files".
         *
         * We deliberately DO NOT show
         * "Invoice downloaded successfully"
         * afterward because shareAsync resolving does
         * not reliably mean the user actually saved it.
         */
        await Sharing.shareAsync(filePath, {
          mimeType: "application/pdf",
          dialogTitle: "Save Invoice",
          UTI: "com.adobe.pdf",
        });
      } catch (shareError: any) {
        // Closing the sheet is not a generation error.
        console.log(
          "iOS save sheet closed:",
          shareError?.message
        );
      }

      return;
    }

    showErrorToast(
      "Invoice download is not supported on this device"
    );
  } catch (error) {
    /*
     * This catch is now primarily for actual
     * invoice-generation failures:
     *
     * - HTML -> PDF failure
     * - cache copy failure
     * - unexpected processing error
     *
     * View/share/download-specific operations have
     * their own handling above.
     */
    console.error(
      "Invoice PDF generation error:",
      error
    );

    // showErrorToast(
    //   "Failed to generate invoice"
    // );
  }
};