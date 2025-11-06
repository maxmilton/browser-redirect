// import type { ConsoleMessage } from "@playwright/test";
import { expect, test } from "./fixtures.ts";

test.describe.configure({
  mode: "parallel",
  timeout: 1000,
});

test.beforeEach(async ({ context }) => {
  // Mock all requests as 200 OK, we're only checking URL redirects
  await context.route(/.*/, (route) => route.fulfill());
});

test("www.reddit.com", async ({ page }) => {
  await page.goto("https://www.reddit.com/r/test/");
  await expect(page).toHaveURL("https://redlib.privacyredirect.com/r/test/");
});

test("old.reddit.com", async ({ page }) => {
  await page.goto("https://old.reddit.com/r/test/");
  await expect(page).toHaveURL("https://redlib.privacyredirect.com/r/test/");
});

test("www.youtube.com", async ({ page }) => {
  await page.goto("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  await expect(page).toHaveURL("https://piped.video/watch?v=dQw4w9WgXcQ");
});

test("www.youtube-nocookie.com", async ({ page }) => {
  await page.goto("https://www.youtube-nocookie.com/watch?v=dQw4w9WgXcQ");
  await expect(page).toHaveURL("https://piped.video/watch?v=dQw4w9WgXcQ");
});

test("m.youtube.com", async ({ page }) => {
  await page.goto("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  await expect(page).toHaveURL("https://piped.video/watch?v=dQw4w9WgXcQ");
});

test("youtu.be", async ({ page }) => {
  await page.goto("https://youtu.be/dQw4w9WgXcQ");
  await expect(page).toHaveURL("https://piped.video/watch?v=dQw4w9WgXcQ");
});

test("x.com", async ({ page }) => {
  await page.goto("https://x.com/elonmusk/status/1982983035906842651");
  await expect(page).toHaveURL(
    "https://nitter.privacyredirect.com/elonmusk/status/1982983035906842651",
  );
});

test("twitter.com", async ({ page }) => {
  await page.goto("https://twitter.com/elonmusk/status/1982983035906842651");
  await expect(page).toHaveURL(
    "https://nitter.privacyredirect.com/elonmusk/status/1982983035906842651",
  );
});

test("imgur.com", async ({ page }) => {
  await page.goto("https://imgur.com/t/test");
  await expect(page).toHaveURL("https://rimgo.privacyredirect.com/t/test");
});

test("i.imgur.com", async ({ page }) => {
  await page.goto("https://i.imgur.com/FZ7qIEV.png");
  await expect(page).toHaveURL("https://rimgo.privacyredirect.com/FZ7qIEV.png");
});

test("www.quora.com", async ({ page }) => {
  await page.goto("https://www.quora.com/test");
  await expect(page).toHaveURL("https://quetre.privacyredirect.com/test");
});

test("www.imdb.com", async ({ page }) => {
  await page.goto("https://www.imdb.com/title/tt6988290/");
  await expect(page).toHaveURL("https://libremdb.privacyredirect.com/title/tt6988290/");
});

test("medium.com", async ({ page }) => {
  await page.goto("https://medium.com/@test/a-test");
  await expect(page).toHaveURL("https://scribe.privacyredirect.com/@test/a-test");
});

test("*.medium.com", async ({ page }) => {
  await page.goto("https://test.medium.com/a-test");
  await expect(page).toHaveURL("https://scribe.privacyredirect.com/@test/a-test");
});

test("wikipedia.org", async ({ page }) => {
  await page.goto("https://wikipedia.org");
  await expect(page).toHaveURL("https://wikiless.privacyredirect.com/");
});

test("en.wikipedia.org", async ({ page }) => {
  await page.goto("https://en.wikipedia.org/wiki/Software_testing");
  await expect(page).toHaveURL("https://wikiless.privacyredirect.com/wiki/Software_testing");
});

test("en.wikipedia.org with fragment", async ({ page }) => {
  await page.goto("https://en.wikipedia.org/wiki/Software_testing#See_also");
  await expect(page).toHaveURL(
    "https://wikiless.privacyredirect.com/wiki/Software_testing#See_also",
  );
});

test("simple.wikipedia.org", async ({ page }) => {
  await page.goto("https://simple.wikipedia.org/wiki/Software_testing");
  await expect(page).toHaveURL(
    "https://wikiless.privacyredirect.com/wiki/Software_testing?lang=simple",
  );
});

test("ko.wikipedia.org", async ({ page }) => {
  await page.goto(
    "https://ko.wikipedia.org/wiki/%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4_%ED%85%8C%EC%8A%A4%ED%8A%B8",
  );
  await expect(page).toHaveURL(
    "https://wikiless.privacyredirect.com/wiki/%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4_%ED%85%8C%EC%8A%A4%ED%8A%B8?lang=ko",
  );
});

test("ko.wikipedia.org with fragment", async ({ page }) => {
  await page.goto(
    "https://ko.wikipedia.org/wiki/%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4_%ED%85%8C%EC%8A%A4%ED%8A%B8#%EA%B0%99%EC%9D%B4_%EB%B3%B4%EA%B8%B0",
  );
  await expect(page).toHaveURL(
    "https://wikiless.privacyredirect.com/wiki/%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4_%ED%85%8C%EC%8A%A4%ED%8A%B8?lang=ko#%EA%B0%99%EC%9D%B4_%EB%B3%B4%EA%B8%B0",
  );
});

test("stackoverflow.com", async ({ page }) => {
  await page.goto(
    "https://stackoverflow.com/questions/79810480/test-only-endpoints-purely-for-e2e-tests",
  );
  await expect(page).toHaveURL(
    "https://anonymousoverflow.privacyredirect.com/questions/79810480/test-only-endpoints-purely-for-e2e-tests",
  );
});

test("www.pinterest.com", async ({ page }) => {
  await page.goto("https://www.pinterest.com/jnase1/testing/");
  await expect(page).toHaveURL("https://binternet.privacyredirect.com/jnase1/testing/");
});

test("i.pinimg.com", async ({ page }) => {
  await page.goto("https://i.pinimg.com/originals/8b/1b/56/8b1b5610c4ee0c9f3ca28087c5499c0e.jpg");
  await expect(page).toHaveURL(
    "https://binternet.privacyredirect.com/image_proxy.php?url=https://i.pinimg.com/originals/8b/1b/56/8b1b5610c4ee0c9f3ca28087c5499c0e.jpg",
  );
});

test("www.goodreads.com", async ({ page }) => {
  await page.goto("https://www.goodreads.com/book/show/24327286-the-test-book");
  await expect(page).toHaveURL(
    "https://biblioreads.privacyredirect.com/book/show/24327286-the-test-book",
  );
});

test("translate.google.com", async ({ page }) => {
  await page.goto(
    "https://translate.google.com/?sl=auto&tl=en&text=%ED%85%8C%EC%8A%A4%ED%8A%B8&op=translate",
  );
  await expect(page).toHaveURL(
    "https://translate.privacyredirect.com/?sl=auto&tl=en&text=%ED%85%8C%EC%8A%A4%ED%8A%B8&op=translate",
  );
});

test("www.twitch.tv", async ({ page }) => {
  await page.goto("https://www.twitch.tv/lofigirl");
  await expect(page).toHaveURL("https://safetwitch.privacyredirect.com/lofigirl");
});

test("player.twitch.tv", async ({ page }) => {
  await page.goto("https://player.twitch.tv/?lofigirl&parent=example.com");
  await expect(page).toHaveURL("https://safetwitch.privacyredirect.com/lofigirl");
});
