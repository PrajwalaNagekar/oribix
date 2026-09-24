# Oribrix quote cart and contact upgrade

## What will change

- Remove the Lucknow office block from the footer while keeping the company phone and navigation links.
- Turn the address on the Contact page into a direct Google Maps link that opens the exact Sushant Golf City address.
- Simplify Contact into a regular contact page for general messages, with name, phone/email, subject, and message fields rather than a bulk-order form.
- Replace bulk-pricing links with a polished quote-request popup, so visitors can submit requirements without leaving their current page.
- Add an animated cart beside “Call us” in the header, with a live item-count badge.
- Add an “Add” control above “Enquire” on every material card. Adding an item updates the cart immediately and supports changing quantities or removing items.
- Make “Enquire” open the quote popup with that material preselected instead of redirecting away.
- Build a cart drawer showing selected materials, quantities, and units. “Request quote” opens a checkout-style RFQ form containing the cart list plus buyer and delivery details.
- Show clear success states for contact and quote requests. As no sending service is connected, submissions will be confirmed in the interface but will not be emailed or stored.

## Experience and visual direction

- Keep Oribrix blue dominant, with forest green for successful cart actions and restrained yellow for counts/highlights.
- Use refined motion for the cart icon, add-button feedback, drawer, and popup while respecting reduced-motion preferences.
- Keep all controls usable on phone and desktop, with keyboard-accessible dialogs and clear focus states.

## Technical details

- Add a shared client-side commerce context at the app root for cart contents and quote-popup state across routes.
- Reuse the existing accessible dialog and sheet controls rather than creating custom overlays.
- Give each catalogue item a stable identifier derived from its catalogue data.
- Update the shared product card so both Home and All Materials receive identical cart and enquiry behavior.
- Rewire bulk-pricing CTAs across Home, Products, and the footer to the shared quote popup; leave general Contact navigation unchanged.
- Verify all routes, cart add/update/remove, preselected enquiry, quote checkout, contact submission, mobile layout, overflow, and browser errors.
