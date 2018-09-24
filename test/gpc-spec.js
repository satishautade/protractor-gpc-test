var EC = require('protractor').ExpectedConditions;

describe('Download GP Connect Script', function() {

    var username = element(by.css('input#username'));
    var password = element(by.css('input#password'));
    var loginButton = element(by.css('button#submit'));
    var downloadSelectedScriptsButton = $('#downloadselected');
    var checkboxesLocator = $$('input[id^=selector]');
    var downloadScriptsDialog = $('.mat-dialog-container');
    var activeDownloadLinks = $$('a.likeLink[disabled=false]');
    var downloadLinks = $$('a.likeLink');
    var downloadScripts = element(by.partialLinkText('Download Scripts'));
    var downloadScriptSummaries = element(by.partialLinkText('Download Script Summaries'));
    var downloadScriptRecords = element(by.partialLinkText('Download Script Records'));

    beforeAll(()=> {
      browser.ignoreSynchronization = true;
    });

    it('should login', async function() {
      // Navigate to GPConnect
      await browser.get('http://test.gpconnect.medadvisor.com.au.s3-website-ap-southeast-2.amazonaws.com');
      expect(await browser.getTitle()).toEqual('GPConnect');
      // Login
      await username.sendKeys('robot@medadvisor.com.au');
      await password.sendKeys('asdfASDF12!@');
      await loginButton.click();
      // Wait for Download Selected Scripts Button (Unique on this page)
      var visibilityOfDownload = EC.elementToBeClickable(downloadSelectedScriptsButton);
      browser.wait(visibilityOfDownload); 
      // Assert Button Text to be DOWNLOAD SELECTED SCRIPTS
      expect(await downloadSelectedScriptsButton.getText()).toContain('DOWNLOAD SELECTED SCRIPTS');
      
      // Validate checkboxes count is non-zero after they appear
      var visibilityOfCheckboxes= EC.visibilityOf(checkboxesLocator.first());
      await browser.wait(visibilityOfCheckboxes);
      var checkboxes = await checkboxesLocator;
      await expect(checkboxes.length).not.toBeLessThan(1);
      // Check first checkbox
      var firstCheckbox = await checkboxesLocator.first();
      await firstCheckbox.click();
      // Click on Donwload Selected Scripts button
      await downloadSelectedScriptsButton.click();
      // Wait for Donwload Dialog
      var visibilityOfDownloadDialog = EC.visibilityOf(downloadScriptsDialog);
      await browser.wait(visibilityOfDownloadDialog);
      
      // Assert there are 3 download links
      var linksCount = await downloadLinks.count();
      await expect(linksCount).toBe(3);
      
      // Wait for all of the Download Links to be enabled
      var visibilityOfDownloadLinks = EC.elementToBeClickable(activeDownloadLinks.first());
      await browser.wait(visibilityOfDownloadLinks, 60000);

      visibilityOfDownloadLinks = EC.elementToBeClickable(activeDownloadLinks.get(1));
      await browser.wait(visibilityOfDownloadLinks, 60000);

      visibilityOfDownloadLinks = EC.elementToBeClickable(activeDownloadLinks.get(2));
      await browser.wait(visibilityOfDownloadLinks, 60000);
     
      await downloadScripts.click();
      await downloadScriptSummaries.click();
      await downloadScriptRecords.click();

    });

  });