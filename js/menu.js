/*
  Beachview Grocery — store info and menu.

  This is the only file you need to edit to change menu items, prices or hours.

  Each item has:
    name    — shown in bold
    desc    — optional one-line description
    price   — a number (9.99), or a list of options: [["Cup", 3.99], ["Bowl", 5.99]]
    unit    — optional, e.g. "lb" shows as "$5.99 /lb"
    tag     — optional short label, e.g. "House favorite"

  Each section has a short "tab" label used for the menu tabs. A section
  holds either a flat "items" list, or "groups" (each with its own title and
  items) when one tab covers several kinds of things.

  Items marked  // confirmed  come from customer reviews or the owner.
  Everything else is a PLACEHOLDER — swap in the real items and prices
  once the store confirms them.
*/

window.STORE = {
  name: "Beachview Grocery",
  phone: "(262) 539-2662",
  phoneHref: "+12625392662",
  street: "33225 S Lakeshore Dr",
  city: "Burlington",
  state: "WI",
  zip: "53105",
  lake: "Bohners Lake",
  // 24-hour clock. Days: 0 = Sunday … 6 = Saturday.
  hours: [
    { day: 0, open: 7, close: 21 },
    { day: 1, open: 7, close: 21 },
    { day: 2, open: 7, close: 21 },
    { day: 3, open: 7, close: 21 },
    { day: 4, open: 7, close: 21 },
    { day: 5, open: 7, close: 22 },
    { day: 6, open: 7, close: 22 }
  ],
  timeZone: "America/Chicago"
};

window.MENU = [
  {
    id: "sandwiches",
    tab: "Sandwiches",
    title: "Homemade Sandwiches",
    note: "Made to order on white, wheat or rye. Hoagie roll $1 more. Every sandwich comes with a pickle spear.",
    items: [
      { name: "The Bohner", desc: "Our house sub. Ham, turkey, salami, provolone, lettuce, tomato, onion, oil and vinegar.", price: 11.99, tag: "House favorite" }, // name confirmed, recipe placeholder
      { name: "Italian", desc: "Capicola, genoa salami, pepperoni, provolone, banana peppers, Italian dressing.", price: 11.49 },
      { name: "Club", desc: "Turkey, ham, bacon, American, lettuce, tomato and mayo on toast.", price: 11.49 },
      { name: "Roast Beef & Cheddar", desc: "Wisconsin cheddar, red onion, horseradish mayo.", price: 10.99 },
      { name: "Turkey & Swiss", desc: "Lettuce, tomato, mayo.", price: 9.99 },
      { name: "Chicken Salad", desc: "Made here with celery and grapes, on a croissant.", price: 9.49 },
      { name: "Ham & Cheese", desc: "Your choice of cheese.", price: 8.99 },
      { name: "Veggie", desc: "Provolone, cucumber, peppers, onion, lettuce, tomato, hummus.", price: 8.49 },
      { name: "Build Your Own", desc: "Pick a meat, a cheese and any toppings.", price: 8.99 }
    ]
  },
  {
    id: "hot",
    tab: "Hot Food",
    title: "Hot Food",
    note: "Out of the hot case from 11 am until it's gone.",
    items: [
      { name: "Grilled Brat", desc: "One of our own brats on a bun. Kraut and onions on request.", price: 5.49 },
      { name: "Brat Plate", desc: "Two brats, chips and a pickle.", price: 8.99 },
      { name: "Philly Cheesesteak", desc: "Shaved ribeye, peppers, onions, provolone.", price: 11.99 },
      { name: "Meatball Sub", desc: "Marinara and melted mozzarella.", price: 10.49 },
      { name: "Hot Ham & Cheese", desc: "On a toasted hoagie.", price: 8.99 },
      { name: "Fried Chicken", desc: "Mixed white and dark.", price: [["2 pc", 5.99], ["8 pc", 18.99]] },
      { name: "Fried Cheese Curds", desc: "Wisconsin white cheddar curds, ranch on the side.", price: 6.99 },
      { name: "Pizza by the Slice", desc: "Cheese or pepperoni.", price: 3.49 },
      { name: "Soup of the Day", desc: "Ask what's on today.", price: [["Cup", 3.99], ["Bowl", 5.99]] }
    ]
  },
  {
    id: "meat",
    tab: "Steaks & Meat",
    title: "Steaks & Meat",
    note: "We butcher in-house every week. Ask at the counter for custom cuts, thickness or bulk orders.",
    groups: [
      {
        title: "Steaks",
        items: [
          { name: "T-Bone", price: 14.99, unit: "lb" },              // confirmed (item, not price)
          { name: "Ribeye", price: 16.99, unit: "lb" },
          { name: "New York Strip", price: 15.49, unit: "lb" },
          { name: "Porterhouse", price: 15.99, unit: "lb" },
          { name: "Beef Tenderloin Filet", price: 22.99, unit: "lb" },
          { name: "Sirloin", price: 10.99, unit: "lb" }
        ]
      },
      {
        title: "Beef, Pork & Chicken",
        items: [
          { name: "Ground Beef", desc: "85% lean, ground fresh.", price: 5.99, unit: "lb" }, // confirmed (item, not price)
          { name: "Burger Patties", desc: "1/3 lb each.", price: 6.49, unit: "lb" },
          { name: "Pork Chops", desc: "Bone-in, center cut.", price: 4.99, unit: "lb" },
          { name: "Baby Back Ribs", price: 6.99, unit: "lb" },
          { name: "Chicken Breast", desc: "Boneless, skinless.", price: 4.49, unit: "lb" },
          { name: "Chuck Roast", price: 8.49, unit: "lb" }
        ]
      },
      {
        title: "House-Made Brats & Sausage",
        items: [
          { name: "Original Brat", price: 6.49, unit: "lb" },
          { name: "Cherry Brat", price: 6.99, unit: "lb", tag: "Customer pick" },            // confirmed
          { name: "Cheddar Jalapeño Brat", price: 6.99, unit: "lb", tag: "Customer pick" },  // confirmed
          { name: "Beer Brat", price: 6.79, unit: "lb" },
          { name: "Bacon Cheddar Brat", price: 7.29, unit: "lb" },
          { name: "Italian Sausage", desc: "Mild or hot.", price: 6.49, unit: "lb" }
        ]
      }
    ]
  },
  {
    id: "deli",
    tab: "Deli Counter",
    title: "Deli Counter",
    note: "Meat and cheese sliced to order, any thickness you like.",
    groups: [
      {
        title: "Meats",
        items: [
          { name: "Honey Ham", price: 7.99, unit: "lb" },
          { name: "Smoked Turkey", price: 9.49, unit: "lb" },
          { name: "Roast Beef", price: 11.99, unit: "lb" },
          { name: "Genoa Salami", price: 9.99, unit: "lb" }
        ]
      },
      {
        title: "Wisconsin Cheese",
        items: [
          { name: "Aged Cheddar", price: 8.99, unit: "lb" },
          { name: "Colby Jack", price: 6.99, unit: "lb" },
          { name: "Baby Swiss", price: 7.99, unit: "lb" },
          { name: "Fresh Cheese Curds", desc: "Ask which day they came in.", price: 6.99, unit: "lb" }
        ]
      },
      {
        title: "Salads",
        items: [
          { name: "Potato Salad", price: 4.99, unit: "lb" },
          { name: "Macaroni Salad", price: 4.49, unit: "lb" },
          { name: "Coleslaw", price: 3.99, unit: "lb" },
          { name: "Party Tray", desc: "Meat and cheese, serves 10 to 12. Order a day ahead.", price: 49.99 }
        ]
      }
    ]
  },
  {
    id: "liquor",
    tab: "Beer & Liquor",
    title: "Beer, Wine & Liquor",
    note: "You must be 21 with a valid ID. Under Wisconsin law, liquor and wine sales end at 9 pm.",
    groups: [
      {
        title: "Beer",
        items: [
          { name: "Miller Lite", price: [["12 pk", 12.99], ["30 pk", 24.99]] },
          { name: "Busch Light", price: [["12 pk", 11.49], ["30 pk", 22.99]] },
          { name: "Spotted Cow", desc: "New Glarus.", price: [["6 pk", 10.99], ["12 pk", 19.99]] },
          { name: "Leinenkugel's Summer Shandy", price: [["12 pk", 17.99]] },
          { name: "White Claw", desc: "Variety pack.", price: [["12 pk", 19.99]] }
        ]
      },
      {
        title: "Liquor & Wine",
        items: [
          { name: "Korbel Brandy", desc: "For your old fashioned.", price: [["750 ml", 17.99], ["1.75 L", 32.99]] },
          { name: "Tito's Vodka", price: [["750 ml", 21.99], ["1.75 L", 36.99]] },
          { name: "Jameson", price: [["750 ml", 29.99]] },
          { name: "Fireball", price: [["50 ml", 1.49], ["750 ml", 16.99]] },
          { name: "House Wine", desc: "Red or white, ask what's in the cooler.", price: [["750 ml", 11.99]] }
        ]
      }
    ]
  },
  {
    id: "lake",
    tab: "Lake Supplies",
    title: "Lake Supplies & Groceries",
    note: "What you need for a day on the water, and the everyday basics.",
    groups: [
      {
        title: "Lake Supplies",
        items: [
          { name: "Bagged Ice", price: [["10 lb", 3.49], ["20 lb", 5.99]] },
          { name: "Nightcrawlers", desc: "Dozen.", price: 4.49 },
          { name: "Wax Worms", desc: "For ice fishing season.", price: 3.99 },
          { name: "Hooks, Bobbers & Sinkers", price: [["from", 2.99]] },
          { name: "Sunscreen", desc: "SPF 30 and 50.", price: 9.99 },
          { name: "Bug Spray", price: 7.99 },
          { name: "Firewood Bundle", price: 7.99 },
          { name: "Charcoal", desc: "15.4 lb bag.", price: 14.99 },
          { name: "Propane Tank Exchange", price: 24.99 }
        ]
      },
      {
        title: "Groceries",
        items: [
          { name: "Milk", desc: "Gallon, 2%.", price: 4.29 },
          { name: "Eggs", desc: "Dozen, large.", price: 3.79 },
          { name: "Bread", desc: "White or wheat loaf.", price: 3.49 },
          { name: "Brat Buns", desc: "8 pack.", price: 3.99 },
          { name: "Chips", desc: "Family size.", price: 5.49 },
          { name: "Coffee", desc: "Hot, any size.", price: 1.99 }
        ]
      }
    ]
  }
];
