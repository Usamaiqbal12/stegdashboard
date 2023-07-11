/*
const contentSloganOld = `
Combining artificial intelligence, machine learning, and computer vision with 
steganography, StegVision can help your brand avoid losing money through 
counterfeit products. Maintain your authenticity while staying one step ahead 
of the competition.`;
*/

const contentSlogan = `
Stopping counterfeit products has never been easier and more cost effective.
Using Stegvisions proprietary technology, we encode an invisible signature 
in existing brand marketing. Immediate authentication can easily be verified 
with a mobile phone.`

/*
const contentSpecialOld = [
  { 
    heading: '',
    content: `
      StegVision’s SaaS program creates customized markings and labels for each 
      of your brand’s products, making them nearly impossible to counterfeit.
    `
  },
  { 
    heading: '',
    content: `
      The StegVision App allows consumers to recognize a “fake” product on the 
      spot, turning them toward your authentic brand to ensure quality.
    `
  },
  { 
    heading: '',
    content: `
      StegVision provides information on brands, offers warranty registration 
      for merchandise, and enables consumers to confirm the authenticity of 
      products.
    `
  },
  {
    heading: '',
    content: `
    The StegVision technology benefits both companies and consumers, allowing 
    customers the opportunity to avoid investing in otherwise “fake” products 
    and boosting revenue for brands everywhere.`
  },
  {
    heading: '',
    content: `
    StegVision technology can be encoded on nearly any medium that supports 
    embedding, catering to various brands and industries.`
  },
  {
    heading: '',
    content: `
    Your brand has access to an additional marketing strategy as you get to 
    know your customers better than ever before with the StegVision app.`
  }
];
*/

const contentSpecial = [
  {
    heading: '',
    content: 'Stealth Counterfeit Technology'
  },
  {
    heading: '',
    content: 'Only Requires Mobile Phone'
  },
  {
    heading: '',
    content: 'Global Coverage'
  },
  {
    heading: '',
    content: 'Use With Most Mediums'
  },
  {
    heading: '',
    content: 'Strong Consumer Engagement'
  },
  {
    heading: '',
    content: 'Minimal Cost to Implement'
  },
  {
    heading: '',
    content: 'No Visual Changes are Required'
  },
  {
    heading: '',
    content: 'Use Existing Vendors'
  },
  {
    heading: '',
    content: 'White Label Opportunity'
  },
  {
    heading: '',
    content: (
      <span>
        QR Codes are Easy to Tamper With.
        <br />
        <p style={{ fontSize: "12px" }}>
          See <a
            style={{ color: "gray", textDecoration: "underline" }}
            href="https://www.ic3.gov/Media/Y2022/PSA220118"
          >FBI Alert</a> for details.
        </p>
      </span>
    )
  }
]

const contentMission = () => {
  return (
<div>
<p className="heading">The StegVision Mission</p>
<p className="para">
  With an estimated 2 trillion dollars’ worth of counterfeit goods is 
  projected to be sold by 2022, the StegVision team recognizes the need for 
  brand authenticity, not only for the benefit of retailers but also for 
  consumers across the globe. Too many industries suffer from 
  multi-billion-dollar problems from counterfeit and pirated goods. Developed 
  and founded by ____ in 2021, StegVision is an anti-counterfeit technological 
  breakthrough that allows companies everywhere added security for their 
  unparalleled products and merchandise while providing buyers unmatched 
  experiences with their favorite brands. StegVision has worked with over 
  500 brands, authenticating more than 100,000 products.
</p>
<p className="para">
  The StegVision SaaS platform incorporates a combination of artificial 
  intelligence, machine learning, computer vision, and steganography—the 
  practice of concealing a message or image within another—to provide an 
  invaluable authentication program. Not only can authentication provide 
  productive and original brands security for their products but it can also 
  save thousands of dollars as consumers are considerably more apt to invest 
  in authentic and genuine merchandise. Your brand is your most valuable asset. 
  Ensure its authenticity and connect with your customers in a way only you 
  can do best.
</p>
<br />
<br />
<p className="heading">How it works:</p>
<p className="para">
1. Brands and retailers provide StegVision with their art, logo, and 
all other information they’d prefer to showcase. We then create 
individual, one-of-a-kind encoded labels, hangtags, and markings for 
each product through our SaaS program.
</p>
<p className="para">
2. Manufacturers supply products with our incorporated encodings to retailers. 
They are then distributed and sold in name-brand locations and online storefronts.
</p>
<p className="para">
3. Consumers can use the StegVision app to scan the encoded tag, where it 
provides information on whether the product is recognized (authentic) or 
unknown (fake). Consumers can also use the app to read more about a product 
and/or brand, care instructions, country of origin, and much more.
</p>
</div>
);
}

export { 
  contentSlogan,
  contentSpecial,
  contentMission
};
