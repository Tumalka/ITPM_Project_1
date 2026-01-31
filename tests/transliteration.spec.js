import { test, expect } from '@playwright/test';

const scenarios = [
    
    //Positive cases
    { id: 'Pos_Fun_0001', input: 'mata udhavvak oonee.' },
    { id: 'Pos_Fun_0002', input: 'Rs. 20000k Nayata gaththaa.' },
    { id: 'Pos_Fun_0003', input: 'ammaa uyanna parakku vuna nisaa bus eka allaganna bari vunaa.' },
    { id: 'Pos_Fun_0004', input: 'karuNaakarala methanin yanna' },
    { id: 'Pos_Fun_0005', input: 'api labana maase Jaffna yanavaa.' },
    { id: 'Pos_Fun_0006', input: 'api heta enavaa.' },
    { id: 'Pos_Fun_0007', input: 'suba dhavasak!' },
    { id: 'Pos_Fun_0008', input: 'karuNaakarala eka poddak balannna puluvandha?' },
    { id: 'Pos_Fun_0009', input: 'eeyi, ooka dhiyan.' },
    { id: 'Pos_Fun_0010', input: 'Samaavenna, mata poddak help ekak dhenna puLuvandha?' },
    { id: 'Pos_Fun_0011', input: 'himin kathaa karamu.' },
    { id: 'Pos_Fun_0012', input: 'liyoo meeting eka dhesaembar 25 raee 8.00PM thiyennee.' },
    { id: 'Pos_Fun_0013', input: 'Hi machan, iiyee Zoom meeting ekee recording eka saha documentation tika Google Drive ekata upload karaala thiyennee. KaruNaakaralaa PDF file eka balalaa Excel sheets vala thiyena data tika verify karanna. Monava hari bugs thiyenavaanam mata Email ekak ho WhatsApp message ekak dhaanako. Eevagema adha raeeta 8 PM valata Teams meeting ekak thiyenavaa UI design eka gana discuss karanna. Call ekata kalin App Store ho Play Store eken app ekee latest version eka install karaaganna mathaka athuva. Api project eka Friday venakota finish karamu.' },
    { id: 'Pos_Fun_0014', input: 'adha 2026/01/20 nisa rs. 500 k dhenna.' },
    { id: 'Pos_Fun_0015', input: 'mata dhaen iithaama mahansiyi, poddak nidhaganna oonee.' },
    { id: 'Pos_Fun_0016', input: 'mama ada hospital giya nisaa mage assignment eka karanna late vunaa, eeth heta wenakota eeka iwara karanna puLuwan veyi kiyala hithanawa.' },
    { id: 'Pos_Fun_0017', input: 'lankaavee parisaraya bohoma sundara nisaa vishala sanscharaka pirisak lankaavata hamadhama enava. api me rata raka ganna oonea nisaa parisaraya pahasuven dushnaya karanna honda naehae. eevageema api heta udee 10.00 am venakota colombo gihin meeting ekata join venna hithan inne. oyaalath enavadha kiyala mata vahaama kiyanna.' },
    { id: 'Pos_Fun_0018', input: 'meeka kiyadhdha?' },
    { id: 'Pos_Fun_0019', input: '2026/02/01 venidhaa nivaadu.' },
    { id: 'Pos_Fun_0020', input: 'malli, niyamayi!! ' },
    { id: 'Pos_Fun_0021', input: 'price eka $500 (Rs. 150,000) vagee veevi' },
    { id: 'Pos_Fun_0022', input: 'amma adha vaeda hari amarui, ude idan meeting meeting nisaa lunch eka vath kanna vune naehae.' },
    { id: 'Pos_Fun_0023', input: 'mata poddak udhavvak karanna puluwandha?' },
    { id: 'Pos_Fun_0024', input: 'puLuvannam mata eeka heta evanna.' },

    // Negative cases
    { id: 'Neg_Fun_0001', input: 'mma hospitalyanavaa.' },
    { id: 'Neg_Fun_0002', input: 'api heta enavaaeenisaa kaema hadhanna one naee ' },
    { id: 'Neg_Fun_0003', input: 'mama yaluwagegedhara gihin yanava.' },
    { id: 'Neg_Fun_0004', input: 'guys ada $ supiri ### elakiri !!!' },
    { id: 'Neg_Fun_0005', input: 'o  ya  ta hodaida' },
    { id: 'Neg_Fun_0006', input: 'guys podi wadak meka' },
    { id: 'Neg_Fun_0007', input: 'pan gediye mila Rs.120k' },
    { id: 'Neg_Fun_0008', input: 'ahara jeerna kriyaawaliya' },
    { id: 'Neg_Fun_0009', input: 'aMMa mn achchilage gedara gihin ennam' },
    { id: 'Neg_Fun_0010', input: 'mama campus gihin igena gena hoda rassawak karalaa hodin jiwath wenawa' },
];

test.describe('SwiftTranslator Automation', () => {

    test.setTimeout(180000); 

    for (const data of scenarios) {
        test(`Test Case ${data.id}`, async ({ page }) => {
            
            await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });

            const inputField = page.locator('textarea').first();
            await inputField.waitFor({ state: 'visible' });
            
            await inputField.pressSequentially(data.input, { delay: 15 });


            await page.waitForTimeout(4000); 
            
            const outputField = page.locator('textarea').last();
            const actualOutput = await outputField.inputValue();

            console.log(`\n-----------------------------------`);
            console.log(`TC ID: ${data.id}`);
            console.log(`RESULT: ${actualOutput}`);
            console.log(`-----------------------------------`);

            
            if (data.id.startsWith('Pos')) {
                expect(actualOutput.length).toBeGreaterThan(0);
            }

    
            if (data.id.startsWith('Neg')) {
                expect(actualOutput).toBe('');
            }
            
            
        });
    }

    test('Pos_UI_0001: Output clears when input is deleted', async ({ page }) => {
        await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });
        const inputField = page.locator('textarea').first();
        const outputField = page.locator('textarea').last();
        
        await inputField.fill('Testing Update');
        await page.waitForTimeout(2000);
        await inputField.fill('');
        await page.waitForTimeout(2000);
        
        const output = await outputField.inputValue();
        expect(output).toBe('');
    });
});