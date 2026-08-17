/**
 * Google Apps Script Backend for Alarmi App
 * Optimization Focus: Batch Operations, Error Handling, Governance Security
 */

/**
 * Creates a custom menu in Google Sheets to manually trigger setup.
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('SheetPro App')
    .addItem('Setup Missing Worksheets', 'setupSheets')
    .addToUi();
}

/**
 * Automatically creates the "Holidays" and "OffDays" fallback worksheets 
 * if they are missing from the active document.
 */
function setupSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Setup Holidays Sheet
  var holidaySheet = ss.getSheetByName("Holidays");
  if (!holidaySheet) {
    holidaySheet = ss.insertSheet("Holidays");
    holidaySheet.appendRow(["Date (YYYY-MM-DD)", "Holiday Name"]);
    holidaySheet.getRange("A1:B1").setFontWeight("bold").setBackground("#f3f3f3");
    holidaySheet.setFrozenRows(1);
  }
  
  // Setup OffDays Sheet
  var offDaysSheet = ss.getSheetByName("OffDays");
  if (!offDaysSheet) {
    offDaysSheet = ss.insertSheet("OffDays");
    offDaysSheet.appendRow(["Timestamp", "Requested Leave Date"]);
    offDaysSheet.getRange("A1:B1").setFontWeight("bold").setBackground("#f3f3f3");
    offDaysSheet.setFrozenRows(1);
  }
  
  ss.toast("Worksheets successfully verified/created!", "SheetPro Setup");
  return "Setup Complete";
}

/**
 * Serves the HTML file as a standalone web application.
 */
function doGet(e) {
  setupSheets(); 
  
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('SheetPro Alarm Clock & Alarmi')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * Silently creates a Google Calendar event for the countdown deadline.
 */
function createCalendarEvent(title, targetTimeMs) {
  try {
    if (!title || !targetTimeMs) return { success: false, error: "Invalid parameters" };
    
    var startTime = new Date(targetTimeMs);
    var endTime = new Date(targetTimeMs + 3600000); // 1 hour duration
    
    var event = CalendarApp.getDefaultCalendar().createEvent(title, startTime, endTime, {
      description: 'Countdown deadline automatically created via SheetPro Alarmi Clock.'
    });
    
    return { success: true, eventId: event.getId() };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

/**
 * Fetches public holidays from the Google Sheet and formats them for the frontend.
 */
function getHolidaysFromSheet(year) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Holidays");
    if (!sheet) return {}; 
    
    var data = sheet.getDataRange().getValues();
    if (data.length <= 1) return {};
    
    var holidays = {};
    
    for (var i = 1; i < data.length; i++) {
      var dateVal = data[i][0]; 
      var name = data[i][1];
      if (!dateVal) continue;
      
      var dateStr = "";
      if (dateVal instanceof Date) {
        var y = dateVal.getFullYear();
        var m = ("0" + (dateVal.getMonth() + 1)).slice(-2);
        var d = ("0" + dateVal.getDate()).slice(-2);
        dateStr = y + "-" + m + "-" + d;
      } else {
        dateStr = String(dateVal).trim();
      }
      
      holidays[dateStr] = name;
    }
    return holidays;
  } catch (e) {
    return {};
  }
}

/**
 * Appends requested leave days to the 'OffDays' worksheet (Optimized with Batch Writes).
 */
function saveOffDaysToSheet(datesArray) {
  try {
    if (!datesArray || !Array.isArray(datesArray) || datesArray.length === 0) {
      return { success: false, error: "No dates provided" };
    }
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("OffDays");
    if (!sheet) return { success: false, error: "OffDays sheet not found" };
    
    var timestamp = new Date();
    
    // Batch preparation: Build a 2D array for atomic writing
    var rowsToInsert = datesArray.map(function(dateStr) {
      return [timestamp, dateStr];
    });
    
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow + 1, 1, rowsToInsert.length, 2).setValues(rowsToInsert);
    
    return { success: true };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}
