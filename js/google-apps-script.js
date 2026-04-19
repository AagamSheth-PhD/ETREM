// ============================================================
// ETREM – Google Apps Script Order Sync
// Paste this into: script.google.com → New Project
// Set up: Run → onOpen, then deploy as Web App
// → Execute as: Me
// → Who has access: Anyone (anonymous)
// Copy the deployed Web App URL into main.js GOOGLE_SHEETS_URL
// ============================================================

const SHEET_NAME = "Orders";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)
                  || SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);

    // Add header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Order ID", "Timestamp", "Name", "Phone", "Email",
        "Address", "City", "State", "Pincode",
        "Product", "Size", "Qty", "Product Details",
        "Subtotal", "Shipping Charge", "Discount", "Total Amount",
        "Payment Method", "Payment Status", "Coupon Code"
      ]);
      // Style header row
      sheet.getRange(1, 1, 1, 20).setFontWeight("bold").setBackground("#1a1a1a").setFontColor("#d4a843");
    }

    // Append data row
    sheet.appendRow([
      data.order_id       || "",
      data.timestamp      || new Date().toISOString(),
      data.name           || "",
      data.phone          || "",
      data.email          || "",
      data.address        || "",
      data.city           || "",
      data.state          || "",
      data.pincode        || "",
      data.product_name   || "",
      data.product_size   || "",
      data.quantity       || "",
      data.product_details|| "",
      data.subtotal       || "",
      data.shipping_charge|| 0,
      data.discount       || 0,
      data.total_amount   || "",
      data.payment_method || "",
      data.payment_status || "",
      data.coupon_code    || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", order_id: data.order_id }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Allow CORS preflight (GET returns ok)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ETREM Order Sync Active" }))
    .setMimeType(ContentService.MimeType.JSON);
}
