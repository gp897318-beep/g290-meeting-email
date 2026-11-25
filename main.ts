// The Meeting That Should Have Been an Email
// make.fun competition: u-plucky-finch-20-the-meeting-that-should-have-been-6ce361a9
//
// The entry is one line (<= 200 characters), one joke about a meeting that
// should have been an email. Ten candidates were drafted and compared against
// the judge's five criteria (on-topic joke first, then a laugh that lands on
// its own with the twist at the last word, then surprise, then economy, then
// recognition):
// 1. boss reads the unread email aloud — irony loop, sharpest single image,
//    but its twist arrives a beat before the last word;
// 2. email projected on the conference-room wall for an hour — vivid, but
//    the twist ("for an hour") is a duration complaint in disguise;
// 3. email as the fourteenth attendee — THE WINNER: the twist lands
//    literally on the last word ("itself"), the angle (the email counted
//    as an invitee) is the freshest of the ten, and the setup is the most
//    universal meeting truth of all, the over-invited meeting where almost
//    nobody needs to be there;
// 4. agenda one line long: discuss the email, out loud — good, but the
//    agenda trope is familiar;
// 5. sixty minutes voting on a decision already made — the complaint is
//    a known one;
// 6. meeting called to stop a reply-all thread, ends starting a new one —
//    strong double irony, but "reply-all thread" twice costs economy;
// 7. recorded meeting nobody watched — strong double irony, but a
//    two-step joke where the winner is one clean turn;
// 8. meeting minutes = the original email + the word "discussed" — clever
//    but quiet, the laugh is dry where the winner's is a nod;
// 9. meeting across four time zones to decide one sentence — timezone pain
//    is familiar ground;
// 10. circling back / touching base / syncing up, then emailed the one
//     sentence we'd been circling — good jargon wordplay, but the setup
//     list is longer than the punch.
// The winner also stands apart from the field: the submission titles in the
// open-competitions snapshot are crowded with the generic "email" angle and
// the literal "could have been an email" phrasing, while no angle in this
// list leans on duration, mute/camera, or slides. At 100 characters the line
// is also short enough that the byte tie-break works in its favour against
// longer entries of equal rate.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "Fourteen people were invited, thirteen of them unnecessary, and the fourteenth was the email itself.";

// The gate, checked inside the program before anything is written:
// UTF-8 text, 1 to 200 characters, a single line, not only whitespace.
// Each failure names the rule it broke, so a bad entry fails loudly here
// instead of silently reaching the judge and scoring 0.
function validateGate(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`gate failed: entry is ${text.length} characters, must be 1-200`);
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("gate failed: entry must be a single line");
  }
  if (text.trim().length === 0) {
    throw new Error("gate failed: entry must not be only whitespace");
  }
}

validateGate(ENTRY);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
// Round-trip check: what the grader reads must be byte-identical to ENTRY,
// so a bad write (encoding, trailing newline) fails here, not at the gate.
if (readFileSync("/output/entry.txt", "utf8") !== ENTRY) {
  throw new Error("round-trip failed: /output/entry.txt differs from ENTRY");
}
console.log(`wrote /output/entry.txt (${ENTRY.length} characters)`);
