/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    REACT_APP_FLUX_API: process.env.REACT_APP_FLUX_API
  },
  async redirects() {
    return [
      {
        "source": "/services",
        "destination": "/services/law-firm-consulting",
        permanent: true,
      },
      // {
      //   "source": "/contact",
      //   "destination": "/free-discovery-call",
      //   permanent: true,
      // },
      {
        "source": "/resources",
        "destination": "/resources/trusted-partners",
        permanent: true,
      },
      {
        "source": "/consultation",
        "destination": "/free-discovery-call",
        permanent: true,
      },
      {
        "source": "/about/founders",
        "destination": "/about",
        permanent: true,
      },
      {
        "source": "/about/testimonials",
        "destination": "/about",
        permanent: true,
      },
      {
        "source": "/about/team",
        "destination": "/about",
        permanent: true,
      },
      {
        "source": "/resources/rjh-in-the-news",
        "destination": "/resources",
        permanent: true,
      },
      {
        "source": "/about/company-overview",
        "destination": "/about",
        permanent: true,
      },
      {
        "source": "/resources/legal-resources",
        "destination": "/resources",
        permanent: true,
      },
      {
        "source": "/legal-notices/disclaimer",
        "destination": "/disclaimer",
        permanent: true,
      },
      {
        "source": "/blog/leveraging-a-law-firms-associates-and-paralegals",
        "destination": "/blog/leveraging-a-law-firm-s-associates-and-paralegals",
        permanent: true,
      },
      {
        "source": "/legal-notices/privacy-policy",
        "destination": "/privacy-policy",
        permanent: true,
      },
      {
        "source": "/legal-notices/cookie-policy",
        "destination": "/cookie-policy",
        permanent: true,
      },
      {
        "source": "/legal-notices/terms-of-use",
        "destination": "/terms-of-use",
        permanent: true,
      },
      {
        "source": "/blog/what-attorneys-need-to-know-about-their-firm-401k-self-directed-brokerage-account",
        "destination": "/blog/what-attorneys-need-to-know-about-their-firm-401-k-self-directed-brokerage-account",
        permanent: true,
      },
      {
        "source": "/improve-lead-conversion-rate",
        "destination": "/",
        permanent: true,
      },
      {
        "source": "/law-firm-partner-compensation",
        "destination": "/",
        permanent: true,
      },
      {
        "source": "/law-firm-partner-compensation",
        "destination": "/",
        permanent: true,
      },
      {
        "source": "/when-whether-raise-the-rates",
        "destination": "/blog/raising-the-rates-client-fees",
        permanent: true,
      },
      {
        "source": "/4-work-from-home-tips-for-managing-partners-of-law-firms",
        "destination": "/blog/4-work-from-home-tips-for-managing-partners-of-law-firms",
        permanent: true,
      },
      {
        "source": "/leveraging-associates-law-firm-profitability",
        "destination": "/blog/leveraging-a-law-firms-associates-and-paralegals",
        permanent: true,
      },
      {
        "source": "/downloads",
        "destination": "/",
        permanent: true,
      },
      {
        "source": "/certifications",
        "destination": "/",
        permanent: true,
      },
      {
        "source": "/sitemap",
        "destination": "/sitemap.xml",
        permanent: true,
      },
      {
        "source": "/legal-notices/terms-and-conditions",
        "destination": "/terms-and-conditions",
        permanent: true,
      },
      // new
      {
        "source": "/krystal-champlin-gerage",
        "destination": "/about/team/krystal-champlin-gerage",
        permanent: true,
      },
      {
        "source": "/bethany-slate",
        "destination": "/about/team/bethany-slate",
        permanent: true,
      },
      {
        "source": "/alicia-vales",
        "destination": "/about/team/alicia-vales",
        permanent: true,
      },
      {
        "source": "/greg-copeland-jd",
        "destination": "/about/team/greg-copeland-jd",
        permanent: true,
      },
      {
        "source": "/mindi-kaploe",
        "destination": "/about/team/mindi-kaploe",
        permanent: true,
      },
      {
        "source": "/lindsay-mattson",
        "destination": "/about/team/lindsay-mattson",
        permanent: true,
      },
      {
        "source": "/james-duvic",
        "destination": "/about/team/james-duvic",
        permanent: true,
      },
      {
        "source": "/jake-davis",
        "destination": "/about/team/jake-davis",
        permanent: true,
      },
      {
        "source": "/matthew-brown",
        "destination": "/about/team/matthew-brown",
        permanent: true,
      },
      {
        "source": "/you-might-be-ready-for-the-sdba-in-your-firm-s-401-k",
        "destination": "/blog/you-might-be-ready-for-the-sdba-in-your-firm-s-401-k",
        permanent: true,
      },
      {
        "source": "/how-to-operate-a-law-firm-to-increase-accountability",
        "destination": "/blog/how-to-operate-a-law-firm-to-increase-accountability",
        permanent: true,
      },
      {
        "source": "/from-the-recruiters-desk",
        "destination": "/blog/from-the-recruiters-desk",
        permanent: true,
      },
      {
        "source": "/24-secrets-to-coach-your-team-to-be-winner",
        "destination": "/blog/24-secrets-to-coach-your-team-to-be-winner",
        permanent: true,
      },
      {
        "source": "/what-attorneys-need-to-know-about-their-firm-401-k-self-directed-brokerage-account",
        "destination": "/blog/what-attorneys-need-to-know-about-their-firm-401-k-self-directed-brokerage-account",
        permanent: true,
      },
      {
        "source": "/2021-has-one-foot-out-the-door-are-you-meeting-your-goals",
        "destination": "/blog/2021-has-one-foot-out-the-door-are-you-meeting-your-goals",
        permanent: true,
      },
      {
        "source": "/the-cost-of-the-problem-in-your-law-firm-retirement-plan-account",
        "destination": "/blog/the-cost-of-the-problem-in-your-law-firm-retirement-plan-account",
        permanent: true,
      },
      {
        "source": "/how-to-manage-a-small-law-firm",
        "destination": "/blog/how-to-manage-a-small-law-firm",
        permanent: true,
      },
      {
        "source": "/can-a-personal-injury-law-firm-consultant-improve-law-firm-operations-during-social-distancing",
        "destination": "/blog/can-a-personal-injury-law-firm-consultant-improve-law-firm-operations-during-social-distancing",
        permanent: true,
      },
      {
        "source": "/8-tips-from-personal-injury-consultants-working-in-the-new-normal",
        "destination": "/blog/8-tips-from-personal-injury-consultants-working-in-the-new-normal",
        permanent: true,
      },
      {
        "source": "/8-tips-from-personal-injury-consultants-working-in-the-new-normal-copy",
        "destination": "/blog/8-tips-from-personal-injury-consultants-working-in-the-new-normal-copy",
        permanent: true,
      },
      {
        "source": "/what-stage-of-growth-is-your-law-firm-in",
        "destination": "/blog/what-stage-of-growth-is-your-law-firm-in",
        permanent: true,
      },
      {
        "source": "/law-firm-marketing-with-mean-pug-interview",
        "destination": "/blog/law-firm-marketing-with-mean-pug-interview",
        permanent: true,
      },
      {
        "source": "/beyond-the-resume-what-the-hiring-partner-must-consider-when-choosing-the-right-candidate",
        "destination": "/blog/beyond-the-resume-what-the-hiring-partner-must-consider-when-choosing-the-right-candidate",
        permanent: true,
      },
      {
        "source": "/coronavirus-aid-relief-and-economic-security-act",
        "destination": "/blog/coronavirus-aid-relief-and-economic-security-act",
        permanent: true,
      },
      {
        "source": "/how-to-deal-with-nonproductive-partners-in-a-law-firm",
        "destination": "/blog/how-to-deal-with-nonproductive-partners-in-a-law-firm",
        permanent: true,
      },
      {
        "source": "/how-to-deal-with-an-alcoholic-partner-in-a-law-firm",
        "destination": "/blog/how-to-deal-with-an-alcoholic-partner-in-a-law-firm",
        permanent: true,
      },
      {
        "source": "/managing-partner-retirement-plan-long-term",
        "destination": "/blog/managing-partner-retirement-plan-long-term",
        permanent: true,
      },
      {
        "source": "/duties-of-a-new-law-firm-administrator",
        "destination": "/blog/duties-of-a-new-law-firm-administrator",
        permanent: true,
      },
      {
        "source": "/paperless-office-for-your-law-firm",
        "destination": "/blog/paperless-office-for-your-law-firm",
        permanent: true,
      },
      {
        "source": "/the-ins-outs-and-terms-of-the-engagement-letter",
        "destination": "/blog/the-ins-outs-and-terms-of-the-engagement-letter",
        permanent: true,
      },
      {
        "source": "/how-to-meet-greet-and-earn-the-trust-of-a-new-managing-partner",
        "destination": "/blog/how-to-meet-greet-and-earn-the-trust-of-a-new-managing-partner",
        permanent: true,
      },
      {
        "source": "/leveraging-a-law-firm-s-associates-and-paralegals",
        "destination": "/blog/leveraging-a-law-firm-s-associates-and-paralegals",
        permanent: true,
      },
      {
        "source": "/some-pokes-and-prods-to-get-the-attorneys-to-submit-billing-hours-on-time",
        "destination": "/blog/some-pokes-and-prods-to-get-the-attorneys-to-submit-billing-hours-on-time",
        permanent: true,
      },
      {
        "source": "/performance-evaluation",
        "destination": "/blog/performance-evaluation",
        permanent: true,
      },
      {
        "source": "/avoid-waste-of-money-7-ways-to-cut-unnecessary-spending",
        "destination": "/blog/avoid-waste-of-money-7-ways-to-cut-unnecessary-spending",
        permanent: true,
      },
      {
        "source": "/a-good-staff-evaluation-for-a-law-firm",
        "destination": "/blog/a-good-staff-evaluation-for-a-law-firm",
        permanent: true,
      },
      {
        "source": "/strategic-planning-retreats",
        "destination": "/blog/strategic-planning-retreats",
        permanent: true,
      },
      {
        "source": "/raising-the-rates-client-fees",
        "destination": "/blog/raising-the-rates-client-fees",
        permanent: true,
      },
      {
        "source": "/law-firm-partnership-track-management",
        "destination": "/blog/law-firm-partnership-track-management",
        permanent: true,
      },
      {
        "source": "/operational-analysis",
        "destination": "/blog/operational-analysis",
        permanent: true,
      },
      {
        "source": "/law-firm-profit-margin-assessing-partner-profitability",
        "destination": "/blog/law-firm-profit-margin-assessing-partner-profitability",
        permanent: true,
      },
      {
        "source": "/law-firm-profitability-reduce-turnover-time",
        "destination": "/blog/law-firm-profitability-reduce-turnover-time",
        permanent: true,
      },
      {
        "source": "/good-old-law-firm-days-minus-the-technology",
        "destination": "/blog/good-old-law-firm-days-minus-the-technology",
        permanent: true,
      },
      {
        "source": "/the-role-of-a-managing-partner-in-a-small-law-firm",
        "destination": "/blog/the-role-of-a-managing-partner-in-a-small-law-firm",
        permanent: true,
      },
      {
        "source": "/reassessing-your-law-firm-s-strategic-planning",
        "destination": "/blog/reassessing-your-law-firm-s-strategic-planning",
        permanent: true,
      },
      {
        "source": "/how-competitive-is-your-firm-the-industry-standard-might-surprise-you",
        "destination": "/blog/how-competitive-is-your-firm-the-industry-standard-might-surprise-you",
        permanent: true,
      },
      {
        "source": "/law-firm-management-the-80-20-rule",
        "destination": "/blog/law-firm-management-the-80-20-rule",
        permanent: true,
      },
      {
        "source": "/non-equity-partnership",
        "destination": "/blog/non-equity-partnership",
        permanent: true,
      },
      {
        "source": "/are-you-considering-a-merger",
        "destination": "/blog/are-you-considering-a-merger",
        permanent: true,
      },
      {
        "source": "/to-see-better-profits-look-harder-at-where-money-starts-ends",
        "destination": "/blog/to-see-better-profits-look-harder-at-where-money-starts-ends",
        permanent: true,
      },
      {
        "source": "/legal-sector-added-nearly-5-000-jobs-to-kick-off-2021",
        "destination": "/blog",
        permanent: true,
      },
      {
        "source": "/as-case-management-software-usage-grows-lawyers-call-for-more-integrations",
        "destination": "/blog",
        permanent: true,
      },
      {
        "source": "/ask-the-experts-what-will-the-legal-industry-look-like-in-2021",
        "destination": "/blog",
        permanent: true,
      },
      {
        "source": "/as-remote-lawyers-handle-more-admin-tasks-firms-discover-support-inefficiencies",
        "destination": "/blog",
        permanent: true,
      },
      {
        "source": "/ask-the-experts-how-was-the-legal-industry-transformed-in-2020",
        "destination": "/blog",
        permanent: true,
      },
      {
        "source": "/as-furloughs-become-layoffs-what-s-next-for-firm-staff",
        "destination": "/blog",
        permanent: true,
      },
      {
        "source": "/how-misconceptions-overpromises-are-stifling-client-intake-tech-adoption",
        "destination": "/blog",
        permanent: true,
      },
      {
        "source": "/stars-analysis-for-law-firms",
        "destination": "/blog/stars-analysis-for-law-firms",
        permanent: true,
      }
    ]
  }
}

module.exports = nextConfig
