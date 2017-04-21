### XSS

”Cross-Site scripting” är när en attackerare lyckas injicera skadlig JavaScript kod till en webbserver som sedan presenterar koden för besökare av sidan.
På så vis kan attackeraren med hjälp av koden stjäla bl.a. cookies och login-information, vidarebefordra till andra infekterade hemsidor men besökaren tror den är kvar på den aktuella sidan, och även installera t.ex. en keylogger. Målet med en XSS-attack är oftast att komma över användar-relaterad information.
Ett vanligt tillvägagångssätt är att en attackerare skickar med en script-tag i t.ex. en login-form eller kommentarsfält som då sparas i serverns databas ifall den inte, på något sätt, verifieras av servern innan. När sidan sedan renderas i en klients webbläsare så exekveras JavaScript koden hos klienten, och attackeraren kan då få tillgång till cookies mm.  

#### Skydda sig:
Ett första steg är att betrakta all extern input som fientlig. 

* Servern måste validera all information som användaren skickar in så att den inte innehåller skadlig kod. Filtrerar inputen och plockar bort eller ändrar (entiteter) det som kan tolkas som kod innan den lagras i databasen.
* Se till att session-cookies är flaggade med HttpOnly. Då vet webbläsaren att cookien inte ska användas av JavaScript.
* Använda headern CSP (Content Security Policy) som berättar för webbläsaren vilken JavaScript som får användas. Så kallad Whitelist.
* Finns färdiga moduler man kan använda sig av.


### CSRF
	
Cross-Site Request Forgery är inte lika vanligt som XSS men är svårare att skydda sig emot. En attackerare förfalskar ett request som genom användarens webbläsare lurar servern att det är användaren som gör requestet. Det kan vara allt ifrån en POST till en bank att pengar ska överföras till ett annat konto eller lura en annan webbsida, genom GET, att användaren besöker en viss sida (produkt, användarkonto etc.) flera gånger.
Ifall en klient besöker en webbsida med login och sedan inte loggar ut när den lämnar sidan så sparas session-cookien hos användaren. Om användaren sedan t.ex. besöker en webbsida som är infekterad med XSS eller klickar på en länk i ett spam-mail så får den tillbaka ett script som sedan körs i bakgrunden på användarens webbläsare. Scriptet kan då göra en post till en server med hjälp av session-cookien och på så vis lura servern att det är användaren som gör en post.

#### Skydda sig:
* Ett av de vanligaste sätten att skydda sig på CSRF är att använda sig av ”Syncronizer Token Pattern” där servern inkluderar en dold token som attackeraren inte kommer åt. Med hjälp av den kan servern verifiera att det är användaren som gör requests till servern eftersom token är unik för användaren.
* Man kan kontrollera att referer headern kommer från en auktoriserad sida men det anses inte helt säkert.
* Förr var ett vanligt tillvägagångsätt att bara tillåta POST requests eftersom POST ansågs immun mot CSRF-attacker. Men nu kan CSRF-attacker ske med POST och även andra http-metoder så det anses inte heller säkert längre.
* Finns även till CSRF färdiga moduler som hjälper en att skydda sig på attacker.


### CSP

”Content Security Policy” är en http header som anger för webbläsaren hur information och kod på webbplatsen får hanteras. På så vi kan man bestämma från vilka källor information kan hämtas. Godkända källor för CSS och JavaScript kan anges men man har också möjlighet att begränsa var webbläsaren kan ansluta via Websockets och XHR mm. 
Det är en relativt ny teknik som inte är inskriven i standarden men den har ett bra stöd hos de flesta webbläsare. 
Det är ett bra sätt att skydda sig mot XSS-attacker eftersom externt script då inte kan injiceras på webbplatsen.

        Content-Sercurity-Policy: default-src 'self' https://example.com; img-src https://img.com;
        script-src https://script.com;
        
Här ovanför är ett exempel där alla resurser får hämtas ifrån example.com men bilder får också hämtas från img.com och script får även hämtas från script.com.