import { Question } from '@/app/types';

// Define the interface for the question data
interface QuestionData {
  "Question Number": number;
  Category: string;
  Topic?: string;
  Difficulty?: string;
  Question: string;
  Answer: string;
}

export function getRandomQuestionByTopicAndType(topicId: string, questionType: 'multiple-choice' | 'text'): Question | null {
  const filteredQuestions = questionsData.filter((q: QuestionData) => q.Category === topicId);
  if (filteredQuestions.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
  const question = filteredQuestions[randomIndex];
  return {
    id: question["Question Number"].toString(),
    text: question.Question,
    type: type,
    modelAnswer: question.Answer,
    topic: topicId,
    source: "base"
  };
} 

export function getQuestionsByTopic(topicId: string): Question[] {
    return questionsData
    .filter(q => q.Category === topicId)
    .map(q => ({
    id: q["Question Number"].toString(),
    text: q.Question,
    type: 'text', // default type for prototype
    modelAnswer: q.Answer,
    topic: topicId,
    source: "base"
    }));
    }


const questionsData: QuestionData[] = [
    {
        "Question Number": 1,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What are the 3 financial statements?",
         "Answer": "1) Income Statement; 2) Balance Sheet; and 3)Cash Flow Statement"
      },
      {
        "Question Number": 2,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Income Statement",
         "Answer": "The Income Statement gives the company's revenue and expenses and goes all the way down to Net Income, the final line on the statement. Examples of major line items in Income Statements: -Revenue -Cost of Goods Sold -SG&A -Operating Income -Pretax Income -Net Income"
      },
      {
        "Question Number": 3,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Balance Sheet",
         "Answer": "The Balance Sheet shows the company's 1) Assets (its resources) - such as Cash, Inventory and PP&E; 2) Liabilities - such as Debt, Accounts Payable, and Accrued Expenses; and 3) Shareholder's Equity ASSETS = LIABILITIES + SHAREHOLDERS EQUITY"
      },
      {
        "Question Number": 4,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Cash Flow Statement",
         "Answer": "The Cash Flow Statement: - Begins with Net Income, - Adjusts for non-cash expenses and workings capital changes, - Then lists cash flow from investing and financing activities; - At the end you see the company's net change in cash Items in Cash Flow Statement Include: - Net Income; D&A, Stock-Based Comp; Changes in Operating Assets & Liabilities; Cash Flow from Operations; Capital Expenditures; Cash Flow from Investing; Sale\/Purchase of Securities; Dividends Issued; Cash Flow From Financing"
      },
      {
        "Question Number": 5,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "How do the 3 financial statements link together?",
         "Answer": "Net Income from Income Statement flows into Shareholder's Equity on the Balance Sheet, and into the top line of the Cash Flow Statement Changes to Balance Sheet items appear as working capital changes on the Cash Flow Statement Investing and Financing activities affect Balance Sheet items such as PP&E, Debt, and Shareholder's Equity. The Cash and Shareholder's Equity items on the Balance Sheet act as \"plugs\" with Cash flowing in from the final line on the Cash Flow Statement."
      },
      {
        "Question Number": 6,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "If you only had 1 statement what is the best financial statement to use when reviewing the overall health of the company?",
         "Answer": "Use the Cash Flow Statement to assess the health of a company because it gives a true picture of how much cash the company is actually generating, independent of all the non-cash expenses you might have. - Cash flow is the #1 thing you care about when analyzing the overall health of any business"
      },
      {
        "Question Number": 7,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "If you only had 2 statements to assess a company's prospects, which 2 would you use?",
         "Answer": "You would pick the Income Statement and Balance Sheet because you can create the Cash Flow Statement from both of those. - assuming you have \"before\" and \"after\" versions of the Balance Sheet that correspond to the same period the Income Statement is Tracking"
      },
      {
        "Question Number": 8,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "How does Depreciation going up by $10 affect the 3 financial statements?",
         "Answer": "1) Income Statement - Operating Income would decline by $10 and assuming a 40% tax rate, Net Income would go down by $6 2) Cash Flow Statement - Net Income at the top goes down by $6, but the $10 depreciation is a non-cash expense that gets added back, so overall Cash Flow from Operations goes up by $4. 3) Balance Sheet - PP&E goes down by $10 on Asset side because of Depreciation, and Cash is up by $4 from the Changes from the changes on the Cash Flow Statement. Over all Assets is down by $6. Since Net Income fell by $6 as well, Shareholders' Equity on the Liabilities & Shareholder's Equity side is also down by $6 and both sides of the balance sheet balance."
      },
      {
        "Question Number": 9,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "How do Assets and Liabilities affect Cash Flow?",
         "Answer": "And increase in Assets causes a DECREASE in Cash Flow And an increase in Liabilities INCREASES Cash Flow"
      },
      {
        "Question Number": 10,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "If Depreciation is a non-cash expense, why does it affect the cash balance?",
         "Answer": "Although Depreciation is a non-cash expense, it is tax-deductible. Since taxes are a cash expense, Depreciation affects cash by reducing the amount of taxes you pay."
      },
      {
        "Question Number": 11,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Where does Depreciation usually show up on the Income Statement?",
         "Answer": "Deprecation can be shown as a separate line item. OR It can be could be embedded in COGS or Operating Expenses Although every company does it differently. Note that the end result for accounting questions is the same: - Depreciation always reduces Pre-Tax Income"
      },
      {
        "Question Number": 12,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What happens when Accrued Compensation goes up by $10?",
         "Answer": "First confirm that Accrued compensation is now being recognized as an expense -as opposed to just changing non- accrued to accrued compensation On the Income Statement: - Operating Expenses on the Income Statement go up by $10; - Pre-Tax Income falls by $10; and - Net Income Falls by $6 (assuming $40% tax rate) On the Cash Flow Statement: - Net Income is down by $6; - Accrued Compensation will INCREASE Cash Flow by $10 so overall Cash Flow from Operations is up by $4; and - Net Change in Cash at bottom is up by $4 On the Balance Sheet: - Cash is up by $4 therefore so are Assets - On Liabilities and Equity side, Accrued Compensation is a liability so Liabilities are up by $10 and Retained Earnings are down by $6 due to the Net Income so both sides balance"
      },
      {
        "Question Number": 13,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What happens when Inventory goes up by $10, assuming you pay for it with cash?",
         "Answer": "On the Income Statement: - No changes On the Cash Flow Statement: -Inventory is an asset so that decreases your Cash Flow from Operations * it goes down by $10, as does the Net Change in Cash at the bottom On the Balance Sheet Under Assets: - Inventory is up by $10 but Cash is down by $10 so the changes cancel out and Assets still Equals Liabilities & Shareholders' Equity"
      },
      {
        "Question Number": 14,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Why is the Income Statement not affected by changes in inventory?",
         "Answer": "In the case of Inventory, the expense is only recorded when the goods associated with it are sold. - So if it's just sitting in a warehouse, it does not count as a COGS or Operating Expense until the company manufactures it into a product and sells it."
      },
      {
        "Question Number": 15,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "If Apple buys $100 worth of new iPod Factories with debt, how are all 3 statements affected at the start of \"Year 1\" before anything else happens?",
         "Answer": "Start of Year 1 On Apple's Income Statement: - No changes On the Cash Flow Statement: - The additional investment in factories would show up under the Cash Flow from Investing as a Net Reduction in Cash Flow * this means Cash Flow is down by $100 - The additional $100 worth of debt raised would show up as an addition to Cash Flow, canceling out the investment activity On the Balance Sheet: - There is now an additional $100 worth of factories in the PP&E line so PP&E is therefore up by $100. - On the other side, Debt is up by $100 as well and so both sides balance"
      },
      {
        "Question Number": 16,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Now go out 1 year to the start of year 2. Assume the debt is high-yield so no principal is paid off, and assume an interest rate of 10%. Also assume the factories depreciate at a rate of 10% per year. What happens?",
         "Answer": "After a year has passed, Apple must pay interest expense and must record the depreciation. On Apple's Income Statement: - Operating Income decreases by 10% due to the 10% depreciation charge each year - Combined with the $10 in additional Interest Expense, Pre-Tax Income would decrease by $20 * $10 from the depreciation and $10 from Interest Expense -Assuming a tax rate of 40%, Net Income would fall by $12 On the Cash Flow Statement: - Net Income at the top is down $12. - Depreciation is a non-cash expense, so you add it back and the end result is that Cash Flow from Operations is down by $2. On the Balance Sheet: - Under Assets, Cash is down by $2 and PP&E is down by $10 due to the depreciation, so overall Assets are down by $12. - On the other side, since Net Income was down by $12, Shareholder's equity is also down by $12 and both sides balance. -Debt number under Liabilities does not change since we've assumed none of the debt is actually paid back"
      },
      {
        "Question Number": 17,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "At the start of Year 3, the Factories all break down and the value of the equipment is written down to $0. The loan must also be paid back now. Walk through what happens in the 3 statements.",
         "Answer": "After 2 years, the value of the factories is now $80 if we go with the 10% depreciation per year assumption. It is this $80 that we will write down in the 3 statements. On the Income Statement: - The $80 write-down shows up in the Pre-Tax Income line. With a 40% tax rate, Net Income declines by $48 On the Cash Flow Statement: - Net Income is down by $48 but the write-down is a non-cash expense, so we add it back * and therefore Cash Flow from Operations increases by $32 -There are no changes under Cash Flow from Investing -Under Cash Flow from Financing there is a $100 charge for the loan payback -Overall the Net Change in Cash Falls by $68 On the Balance Sheet: -Cash is now down by $68 and PP&E is down by $80 so Assets have decreased by $148 altogether. -Debt is down by $100 since it was paid pff, and since was down by $48, Shareholders equity is down by $48. -Together Liabilities and Shareholders' Equity are down by $148 and both sides balance."
      },
      {
        "Question Number": 18,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Assume a different scenario under which Apple is ordering $10 of additional iPod inventory, using cash on hand. They order the inventory, but they have not manufactured or sold anything yet - What happens to the 3 statements?",
         "Answer": "On the Income Statement: - No changes On the Cash Flow Statement: - Inventory is up by $10, so Cash Flow from Operations decreases by $10. - No other changes so overall, Cash is down by $10 On the Balance Sheet: - Inventory is up by $10 and Cash is down by $10 so the Assets number stays the same and the Balance Sheet remains in balance."
      },
      {
        "Question Number": 19,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Now lets says they sell the iPods for revenue of $20, at a cost of $10, walk me through the 3 statements under this scenario.",
         "Answer": "On the Income Statement: - Revenue is up by $20 and COGS is up by $10, so Gross Profit is up by $10 and Operating Income is up by $10 as well. -Assuming a 40% tax rate, Net Income is up by $6 On the Cash Flow Statement: - Net Income at the top is up by $6 and Inventory has decreased by $10 (since we just manufactured the inventory into real iPods), * which is a net addition to cash flow - so Cash Flow from operations is up by $16 overall - These are the only changes on the Cash Flow Statement, so Net Change in Cash is up by $16. On the Balance Sheet: - Cash is up by $16 and Inventory is down by $10, so Assets is up by $6 overall. - On the other side, Net Income was up by $6 so Shareholders' Equity is up by $6 and both sides balance."
      },
      {
        "Question Number": 20,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Can you ever end up with negative Shareholders' equity? What does it mean?",
         "Answer": "Negative Shareholders' Equity is common in 2 scenarios: 1) Leveraged Buyouts with dividend recapitalizations - It means that the owner of the company has taken out a large portion of its equity (usually in the form of cash) which can sometimes turn the number negative 2) It can also happen if the company has been losing money consistently and therefore has a declining Retained Earnings balance, which is a portion of Shareholder's Equity -It doesn't \"mean\" anything in particular, but it can be a cause for concern and possibly demonstrate that the company is struggling (in the 2nd scenario) NOTE - Shareholder's Equity never turns negative immediately after an LBO - It would only happen following a dividend recap or continued net losses."
      },
      {
        "Question Number": 21,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What is working capital and how is it used?",
         "Answer": "Working = Current - Current Capital Assets Liabilities - If WC is positive, it means a company can pay off its short-term liabilities with its short-term assets. - It is often presented as a financial metric and its magnitude and sign (negative or positive) tells you whether or not the company is \"sound\") Bankers look at Operating Working Capital more commonly in models, and that is defined as: Operating Working Capital = (Current Assets - Cash & Cash Equivs) - (Current Liabilities - Debt)"
      },
      {
        "Question Number": 22,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What does negative Working Capital mean? Is that a bad sign?",
         "Answer": "Negative Working Capital is not necessarily a bad sign. It depends on the type of company and the specific situation. Below are a few examples. 1) Some companies with subscriptions or longer-term contracts often have negative Working Capital because of Deferred Revenue balances. 2) Retail and restaurant companies like Amazon, Wal-Mart, and McDonald's often have negative Working Capital because customers pay upfront. * so they use they can use the cash generated to pay off their Accounts Payable rather than keeping a large cash balance on-hand. This can be a sign of business efficiency. 3) In other cases, Negative Working Capital could point to financial trouble or possible bankruptcy - for example, when customers don't pay quickly and upfront and the company is carrying a high debt balance"
      },
      {
        "Question Number": 23,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Recently, banks have been writing down their assets and taking huge quarterly losses. Walk me through what happens on the 3 statements when there's a write-down of $100.",
         "Answer": "On the Income Statement: - The $100 write-down shows up in the Pre-Tax Income line. With a 40% tax rate, Net income declines by $60. On the Cash Flow Statement: - Net Income is down by $60 but the write-down is a non-cash expense, so we add it back * and therefore Cash Flow from Operations increases by $40. -Overall the Net Change in Cash rises by $40 On the Balance Sheet: - Cash is now up by $40 and an asset is down by $100 * It's not clear which asset since the question never stated the specific asset to write-down -Over all the Assets side is down by $60 -On the other side, Net Income was down by $60, so Shareholders' Equity is also down by $60 - and both sides balance"
      },
      {
        "Question Number": 24,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Walk me through a $100 \"bailout\" of a company and how it affects the 3 statements.",
         "Answer": "First confirm what type of \"bailout\" this is - Debt? - Equity? - Combination? The most common scenario is an equity investment from the government so here's what happens: On the Income Statement: - No changes On the Cash Flow Statement: - Cash Flow from Financing goes up by $100 to reflect the government's investment, * So the Net Change in Cash is up by $100 On the Balance Sheet: - Cash is up by $100 so Assets are up by $100 - On the other side, Shareholders' Equity would go up by $100 to make it balance"
      },
      {
        "Question Number": 25,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Walk me through a $100 write-down of Debt - as in OWED debt, a liability - on a company's balance sheet and how it affects the 3 financial statements.",
         "Answer": "On the Income Statement: - This is counter-intuitive. When a liability is written down you record is as a gain on the Income Statement * With an asset write-down, it's a loss - So Pre-Tax Income goes up by $100 due to this write-down. -Assuming a 40% tax rate, Net Income is up by $60 On the Cash Flow Statement: - Net Income is up by $60, but we need to subtract that debt write-down * So Cash Flow from Operations is down by $40 - The Net Change in Cash is down by $40 On the Balance Sheet: - Cash is down by by $40 so Assets are down by $40 - On the other side, Debt is down by $100 but Shareholders' Equity is up by $60 - This makes Liabilities & Shareholders' Equity down by $40 and it balances"
      },
      {
        "Question Number": 26,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "When would a company collect cash from a customer and not record it as revenue?",
         "Answer": "Three examples: 1) Web-based subscription software 2) cell phone carriers that sell annual contracts 3) Magazine publishers that sell subscriptions - Companies that agree to services in the future often collect cash upfront to ensure stable revenue * This makes investors happy as well since they can better predict a company's performance - Per the rules of GAAP (Generally Accepted Accounting Principles), you only record revenue when you actually perform the services * So the company would not record everything as revenue right away"
      },
      {
        "Question Number": 27,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "If cash collected is not recorded as revenue, what happens to it?",
         "Answer": "- Usually it goes into the Deferred Revenue balance on the Balance Sheet under Liabilities - Over time, as the services are performed, the Deferred Revenue balance \"turns into\" real revenue on the Income Statement"
      },
      {
        "Question Number": 28,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Whats the difference between Accounts Receivable and Deferred Revenue?",
         "Answer": "Accounts Receivable is cash that has not yet been collected from customers * Accounts Receivable represents how much revenue the company is waiting on Deferred Revenue is cash that has been collected from customers * Deferred Revenue represents how much it is waiting to record as revenue"
      },
      {
        "Question Number": 29,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "How long does it usually take for a company to collect its accounts receivable balance?",
         "Answer": "Generally the Accounts Receivable days are in the 40-50 range - can be higher for companies selling high-end items -can be lower for smaller, lower transaction-value companies"
      },
      {
        "Question Number": 30,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What's the difference between cash-based and accrual accounting?",
         "Answer": "Cash Based Accounting: - Recognizes revenue and expenses when cash is actually received or paid out Accrual Accounting: - Accrual accounting recognizes revenue when collection of revenue is reasonably certain * i.e. after a customer has ordered the product - Expenses are recognized when they are incurred rather than when they are paid out in cash - Most large companies use accrual accounting because paying with credit cards and lines of credit is so prevalent these days - Very small businesses may use cash-based accounting to simplify their financial statements"
      },
      {
        "Question Number": 31,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Lets say a customer pays for a TV with a credit card. What would this look like under cash-based vs. accrual accounting?",
         "Answer": "Cash-Based Accounting: - The revenue would not show up until all of the following happen 1) the company charges the customer's credit card; 2) receives authorization; and 3) deposits funds in its bank account - At this point, it would shod up as both Revenue on the income statement and Cash on the Balance Sheet Accrual Accounting: - It shows up as Revenue right away but instead of appearing as Cash on the Balance Sheet, it would go into Accounts Receivable at first. - Once the cash is actually deposited in the company's bank account, it would \"turn into\" Cash."
      },
      {
        "Question Number": 32,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "How do you decide when to capitalize rather than expense a purchase?",
         "Answer": "- If the asset has a useful life of over 1 year, it is capitalized (put on the Balance Sheet rather than shown as an expense on the Income Statement) - Then it is depreciated (if a tangible asset) or amortized (if an intangible asset) over a certain amount of years - Purchases like factories, equipment and land all last longer than a year and therefore show up on the Balance Sheet. -Employee salaries and the cost of manufacturing products (COGS) only cover a short period of operations and therefore show up on the Income Statement as normal expenses instead."
      },
      {
        "Question Number": 33,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Why do companies report both GAAP and non-GAAP (or \"Pro Forma\") earnings?",
         "Answer": "These days, many companies have \"non-cash\" charges such as Amortization of Intangibles, Stock-Based Compensation, and Deferred Revenue Write-down in their Income Statements. As a result, some argue that Income Statements under GAAP no longer reflect how profitable most companies truly are. Non-GAAP earnings are almost always higher because these expenses are excluded."
      },
      {
        "Question Number": 34,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "A company has had positive EBITDA for the past 10 years, but it recently went bankrupt. How could this happen?",
         "Answer": "Possible Scenarios: 1) The company is spending too much on Capital Expenditures * These are not reflected at all in EBITDA, but it could still be cash-flow negative 2) The company has high interest expense and is not longer able to afford its debt. 3) The company's debt all matures on one date and it is unable to refinance it due to a \"credit crunch\" - and it runs out of cash completely when paying back the debt. 4) It has significant one-time charges (from litigation, for example) and those are high enough to bankrupt the company Remember that EBITDA excludes investment in (and depreciation of) long-term assets, interest and one-time charges - and all of these could end up bankrupting the company."
      },
      {
        "Question Number": 35,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Normally Goodwill remains constant on the Balance Sheet - why would it be impaired and what does Goodwill Impairment mean?",
         "Answer": "-Usually Goodwill impairment happens when a company has been acquired and the acquirer re-assesses its intangible assets (such as customer relationships, trademarks\/trade names, and intellectual property) and finds that they are worth significantly less than what they originally thought. - It often happens in acquisitions where the buyer \"overpaid\" for the seller and can result in a large net loss on the Income Statement. - It can also happen when a company discontinues part of its operations and must impair the associated goodwill."
      },
      {
        "Question Number": 36,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Under what circumstances would Goodwill increase?",
         "Answer": "Technically, Goodwill can increase if the company re-assess its value and finds that it is worth more, but that is rare. What usually happens is 1 of 2 scenarios: 1) the company gets acquired or bought out and Goodwill changes as a result * Since its an accounting \"plug\" for the purchase price in an acquisition 2) The company acquires another company and pays more than what its assets are worth - this is then reflected in the Goodwill number"
      },
      {
        "Question Number": 37,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "How is GAAP accounting different from tax accounting?",
         "Answer": "1) GAAP accounting is accrual-based but tax accounting is cash-based 2) GAAP uses straight-line depreciation or a few other methods whereas tax accounting uses accelerated depreciation 3) GAAP is more complex and more accurately tracks assets\/liabilities whereas tax accounting is only concerned with revenue\/expenses in the current period and what income tax you owe"
      },
      {
        "Question Number": 38,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "What are deferred tax assets\/liabilities and how do they arise?",
         "Answer": "DTLs and DTAs arise because of temporary differences between what a company can deduct for cash tax purposes vs. what they can deduct for book tax purposes. Deferred Tax Liabilities: - DTLs arise when you have a tax expense on the Income Statement but haven't actually paid that tax in cold, hard cash yet. Deferred Tax Assets: - DTAs arise when you pay taxes in cash but haven't expensed them on the Income Statement yet. The most common way they occur is with asset write-ups and write-downs in M&A deals - an asset write-up will produce a deferred tax liability while a write-down will produce a deferred tax asset."
      },
      {
        "Question Number": 39,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Walk me through how you create a revenue model for a company.",
         "Answer": "There are 2 ways you could do this: 1) Bottoms-Up Build - Start with individual products\/customers - estimate the average sale value or customer value - and then the growth rate in sales and sales values to tie everything together 2) Tops-Down Build - Start with the \"big-picture\" metrics like overall market size - then estimate the company's market share and how that will change in the coming years - and then multiply to get their revenue Of these two methods, Bottoms-Up is more common and is taken more seriously because estimating \"big-picture\" numbers is almost impossible."
      },
      {
        "Question Number": 40,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Walk me through how you create an expense model for a company.",
         "Answer": "To do a true Bottoms-Up build, you: - Start with each different department of a company, the # of employees in each, the average salary, bonuses and benefits. -Then make assumptions on those going forward. - Usually you assume that the number of employees is tied to revenue, and then you assume growth rates for salary, bonuses, benefits, and other metrics. - COGS should be tied directly to Revenue and each \"unit\" produced should incur an expense. - Other items such as rent, Capex , and miscellaneous expenses are either linked to the company's internal plans for building expansion plans (if they have them), or to Revenue for a more simple model."
      },
      {
        "Question Number": 41,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Walk me through the major items in Shareholders' Equity.",
         "Answer": "Common Items include: Common Stock - Simply the par value of however much stock the company has issue Retained Earnings - How much of the company's Net Income it has \"saved up\" over time Additional Paid-In Capital (APIC) - This keeps track of how much stock-based compensation has been issues and how much new stock employees exercising options have created. It also includes how much over par value a company raises in an IPO or other equity offering. Treasury Stock - The dollar amount of shares that the company has bought back. Accumulated Other Comprehensive Income - This is a \"catch-all\" that includes other items that don't fit anywhere else, like the effect of foreign currency exchange rates changing."
      },
      {
        "Question Number": 42,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Walk me through what flows into Retained Earnings.",
         "Answer": "R.E. = Old Retained Earnings Balance + Net Income - Dividend Issued if you're calculating Retained Earning for the current year, take last year's Retained Earnings number, add this year's Net Income, and subtract however much the company paid out in dividends."
      },
      {
        "Question Number": 43,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Walk me through what flows into Additional Paid-In Capital (APIC)",
         "Answer": "APIC = Old APIC + Stock-Based Compensation + Stock Created by Option Exercises If you're calculating APIC, take the APIC balance from last year, add this year's stock-based compensation number, and then add in however much new stock was created by employees exercising options this year."
        },
        {
         "Question Number": 44,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "What is the Statement of Shareholders' Equity and why do we use it?",
         "Answer": "The Statement of Stockholders' Equity shows everything we went through previously - the major items that comprise Shareholders' Equity and how we arrive at each of them using the numbers elsewhere in the statement. You don't use it too much, but it can be helpful for analyzing companies with unusual stock-based compensation and stock option situations."
        },
        {
         "Question Number": 45,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "What are some examples of non-recurring charges that we need to add back to a company's EBIT\/EBITDA when looking at its financial statements?",
         "Answer": "- Restructuring Charges - Goodwill Impairment - Asset Write-Downs - Bad Debt Expenses - Legal Expenses - Disaster Expenses - Change in Accounting Procedures Note that to be an \"add-back\" or \"non-recurring\" charge for EBIT\/EBITDA purposes, ** it needs to affect Operating Income on the Income Statement.** So if you have charges \"below the line\" then you do not need to add it back for the EBIT\/EBITDA calculation. Also note that you do add back Depreciation, Amortization, and sometimes Stock-Based Compensation for EBIT\/EBITDA, but that that these are not \"non-recurring charges\" because all companies have them every year * These are just non-cash charges"
        },
        {
         "Question Number": 46,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "How do you project Balance Sheet items like Accounts Receivable and Accrued Expenses in a 3-Statement model?",
         "Answer": "Best practice is to make very simple assumptions here and assume these are percentages of revenue, operating expenses, or cost of goods sold. Examples: - Accounts Receivable: % of revenue - Deferred Revenue: % of revenue - Accounts Payable: % of COGS - Accrued Expenses: % of operating expenses or SG&A They you either carry the same percentages across in future years or assume slight changes depending on the company."
        },
        {
         "Question Number": 47,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "How do you project Depreciation & Capital Expenditures?",
         "Answer": "The simple way: - Project each one as a % of revenue or previous PP&E balance The more complex way: - Create a PP&E schedule that 1) Splits out different assets by their useful lives; 2) Assumes straight-line depreciation over each asset's useful life; 3) And then assumes capital expenditures based on what the company has invested historically."
        },
        {
         "Question Number": 48,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "How do Net Operating Losses (NOLs) affect a company's 3 financial statements?",
         "Answer": "The \"quick and dirty\" way to do this: 1) Reduce the Taxable Income by the portion of the NOLs that you can use each year 2) Apply the same tax rate 3) Subtract that new Tax number from your old Pretax Income number (which should stay the same How it should be done: 1) Create a book vs cash tax schedule where you calculate the Taxable Income based on NOLs 2) Look at what you would pay in taxes without the NOLs 3) Book the difference as an increase to the Deferred Tax Liability on the Balance Sheet The proper method reflects the fact that you're saving on cash flow - since the DTL (a liability) is rising - but correctly separates the NOL impact into book vs. cash taxes."
        },
        {
         "Question Number": 49,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "What's the difference between capital leases and operating leases?",
         "Answer": "Operating Leases: - Operating leases are used for short-term leasing of equipment and property - Operating leases show up as operating expenses on the Income Statement Capital Leases: - Capital leases are used for longer-term items and give the lessee ownership rights - Capital leases depreciate and incur interest payments and are counted as debt. A lease is a capital lease if any one of the following 4 conditions is true: 1) if there is a transfer of ownership at the end of the term 2) If there is an option to purchase the asset at a bargain price at the end of the term 3) If the term of the lease is greater than 75% of the useful life of the asset 4) If the present value of the lease payment is greater than 90% of the asset's fair market value"
        },
        {
         "Question Number": 50,
         "Category": "Accounting",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Why would the Depreciation & Amortization number on the Income Statement be different from what's on the Cash Flow Statement?",
         "Answer": "This happens if D&A is embedded in other Income Statement Line items. When this happens, you need to use the Cash Flow Statement number to arrive at EBITDA because otherwise you're undercounting D&A."
        },
        {
         "Question Number": 51,
         "Category": "Enterprise & Equity Value",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Why do we look at both Enterprise and Equity Value",
         "Answer": "Enterprise Value: - Enterprise Value represents the value of the company that is attributable to all investors Equity Value: - Equity Value represents only the portion available to shareholders (equity investors). You look at both because Equity Value is the number the public-at-large sees, while Enterprise Value represents its true value."
        },
        {
         "Question Number": 52,
         "Category": "Enterprise & Equity Value",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "When looking at an acquisition of a company, do you pay more attention to Enterprise or Equity Value?",
         "Answer": "Pay more attention to Enterprise Value because that is how much an acquirer really \"pays\" and includes the often mandatory debt repayment."
        },
        {
         "Question Number": 53,
         "Category": "Enterprise & Equity Value",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What's the formula for Enterprise Value?",
         "Answer": "EV = Equity Value + Debt + Preferred Stock + Minority Interest - Cash *This formula does not tell the whole story but should be good enough for interviews"
        },
        {
         "Question Number": 54,
         "Category": "Enterprise & Equity Value",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Why do you need to add Minority Interest to Enterprise Value?",
         "Answer": "Whenever a company owns over 50% of another company, it is required to report the financial performance of the other company as part of its own performance. So even though it doesn't own 100% of the majority-owned subsidiary's financial performance. In keeping with the \"apples-to-apples\" theme, you must add Minority Interest to get to Enterprise Value so that your numerator and denominator both reflect 100% of the majority-owned subsidiary."
        },
        {
         "Question Number": 55,
         "Category": "Enterprise & Equity Value",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "How do you calculate fully-diluted shares?",
         "Answer": "Take the basic share count and add in the dilutive effect of stock options and any other dilutive securities, such as warrants, convertible debt or convertible preferred stock. To calculate the dilutive effect of options, you can use the Treasury Stock Method."
        },
        {
         "Question Number": 56,
         "Category": "Enterprise & Equity Value",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Let's say a company has 100 Shares outstanding, at a share price of $10 each. It also has 10 options outstanding at an exercise price of $5 each - what is its fully diluted equity value?",
         "Answer": "Basic Equity Value = $1,000 (100 * $10) To calculate the dilutive effect of the options: - First note that the 10 options are all \"in-the-money\" - i.e. their exercise price is less than the current share price. -When these options are exercised, there will be 10 new shares created - so the share count is now 110 rather than 100. However, this doesn't tell the whole story. In order to exercise the options, we had to \"pay\" the company $5 for each option (the exercise price) As a result it now has $50 in additional cash, which it now uses to buy back 5 of the new shares we created. So the fully diluted share is $105 and the fully diluted equity value is $1,050."
        },
        {
         "Question Number": 57,
         "Category": "Enterprise & Equity Value",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Let's say a company has 100 shares outstanding, at a share price of $10 each. It also has 10 options outstanding at an exercise price of $15 each - What is its fully diluted equity value?",
         "Answer": "Fully diluted equity value = $1,000 (100 * $10) In this case the exercise price of the options ($15) is above the current share price ($10), so they have no dilutive effect."
        },
        {
         "Question Number": 58,
         "Category": "Enterprise & Equity Value",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Why do you subtract cash in the formula for Enterprise Value? Is that always accurate?",
         "Answer": "The \"Official\" reason: Cash is subtracted from Enterprise Value because it is considered a non-operating asset and because Equity Value implicitly accounts for it. Alternative way to think about it: - In an acquisition, the buyer would \"get\" the cash of the seller, so it effectively pays less for the company based on how large its cash balance is. - Remember Enterprise Value tells us how much you would really have to \"pay\" to acquire another company. - It's not always accurate because technically you should be subtracting only excess cash - the amount of cash a company has above the minimum cash it requires to operate."
        },
        {
         "Question Number": 59,
         "Category": "Enterprise & Equity Value",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Is it always accurate to add Debt to the Equity Value when calculating Enterprise Value?",
         "Answer": "In most cases you should add debt to the Equity Value when calculating Enterprise value because the terms of a debt agreement usually say that debt must be refinanced in an acquisition. In most cases a buyer will pay off a seller's debt so it is accurate to say that any debt \"adds\" to the purchase price. However there could always be exceptions where the buyer does not pay off the debt but they are super rare."
        },
        {
         "Question Number": 60,
         "Category": "Enterprise & Equity Value",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Could a company have negative Enterprise Value? What would that mean?",
         "Answer": "Yes, a company can have negative Enterprise Value. This can mean that the company has an extremely large cash balance, or an extremely low market capitalization (or both). You see it with: 1) Companies on the brink of bankruptcy 2) Financial institutions, such as banks, that have large cash balances."
        },
        {
         "Question Number": 61,
         "Category": "Enterprise & Equity Value",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Could a company have a negative Equity Value?",
         "Answer": "No, a company with a negative Equity Value is not possible because: 1) you cannot have a negative share count; and 2) you cannot have a negative share price"
        },
        {
         "Question Number": 62,
         "Category": "Enterprise & Equity Value",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Why do we add Preferred Stock to get to Enterprise Value?",
         "Answer": "Preferred Stock is added to get to Enterprise Value because: 1) Preferred Stock pays out a fixed dividend; and 2)preferred stock holders also have a higher claim to a company's assets than equity investors do. As a result it is more similar to debt than common stock."
        },
        {
         "Question Number": 63,
         "Category": "Enterprise & Equity Value",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "A company has 1 million shares outstanding at a value of $100 per share. It also has $10 million of convertible bonds, with par value of $1,000 and a conversion price of $50. How do I calculate diluted shares outstanding?",
         "Answer": "This gets confusing because of the different units involved. 1) First note that these convertible bonds are \"in-the-money\" because the company's share price is $100, but the conversion price is $50. * So we count them as additional shares rather than debt 2) We need to divide the value of the convertible bonds ($10 million) by the par value ($1000) to figure out how many individual bonds we get: - $10 million \/ $1,000 = 10,000 convertible bonds 3) We need to figure out how many shares this represents. the number of shares per bond is the par value divided by the conversion price - $1,000 \/ $50 = 20 shares per bond So we have 200,000 new shares (20 * 10,000) created by the convertibles, giving us 1.2 million diluted shares outstanding. *** Do not use the Treasury Stock Method with convertibles because the company is not \"receiving\" any cash from us."
        },
        {
         "Question Number": 64,
         "Category": "Enterprise & Equity Value",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What is the difference between Equity Value and Shareholders' Equity?",
         "Answer": "Equity Value: - Equity Value is the market value - Equity value can never be negative because shares outstanding and share prices can never be negative. Shareholder's Equity: - Shareholder's Equity is the book value - Shareholder's Equity can be any value. For healthy companies, Equity Value usually far Exceeds Shareholders' Equity."
        },
        {
         "Question Number": 65,
         "Category": "Enterprise & Equity Value",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Can you describe a few of the additional items that might be a part of Enterprise Value, beyond Cash, Debt, Preferred Stock, and Noncontrolling Interests, and explain whether you add or subtract each one?",
         "Answer": "Everyone agrees that Cash should be subtracted and Debt should be added when calculating Enterprise Value, but when you get to more advanced items, treatment varies greatly between different banks and different groups. A more \"complete\" formula might be: Enterprise Value = Equity Value - Cash + Debt + Preferred Stock + Noncontrolling Interests - NOLs - Investments - Equity Investments + Capital Leases + Unfunded Pension Obligations and Other Liabilities."
        },
        {
         "Question Number": 66,
         "Category": "Enterprise & Equity Value",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Wait a second, why might you add back Unfunded Pension Obligations but not something like Accounts Payable? Don't they both need to be repaid?",
         "Answer": "The distinctions are magnitude and source of funds. Accounts Payable, 99% of the time, is paid back via the company's cash flow from its normal business operations. And it tends to be relatively small. Items like Unfunded Pension Obligations, by contrast, usually require additional funding (e.g. the company raises Debt) to be repaid. These types of Liabilities also tend to be much bigger than Working Capital \/ Operational Asset and Liability items."
        },
        {
         "Question Number": 67,
         "Category": "Enterprise & Equity Value",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Are there any exceptions to the rules about subtracting Equity Interests and adding Noncontrolling Interests when calculating Enterprise Value?",
         "Answer": "You pretty much always add Noncontrolling Interests because the financial statements are always consolidated when you own over 50% of another company. But with Equity Interests, you only subtract them if the metric you're looking at does not include Net Income from Equity Interests (which only appears toward the bottom of the Income Statement). For example, Revenue, EBIT, and EBITDA all exclude revenue and profit from Equity Interests, so you subtract Equity Interests. But with Levered Free Cash Flow (Free Cash Flow to Equity), typically you're starting with Net Income Attributable to Parent... which already includes Net Income from Equity Interests. Normally you subtract that out in the CFO section of the Cash Flow Statement so you would still subtract Equity Interests if you calculate Free Cash Flow by going through all the items in that section. But if you have not subtracted out Net Income from Equity Interests (if you've used some other formula to calculate FCF), you should not subtract it in the Enterprise Value calculation - you want to show its impact in that case."
        },
        {
         "Question Number": 68,
         "Category": "Enterprise & Equity Value",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Should you use the Book Value or Market Value of each item when calculating Enterprise Value?",
         "Answer": "Technically, you should use market value for everything. In practice, however, you usually use market value only for the Equity Value portion because it's difficult to determine market values for the rest of the items in the formula - so you take the numbers from the company's Balance Sheet."
        },
        {
         "Question Number": 69,
         "Category": "Enterprise & Equity Value",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "What percentage dilution in Equity Value is \"too high?\"",
         "Answer": "There's no strict \"rule\" here, but most bankers would say that anything over 10% is odd. If the basic Equity Value is $100 million and the diluted Equity Value is $115 million, you might want to check your calculations - it's not necessarily wrong, but over 10% dilution is unusual for most companies. And something like 50% dilution would be highly unusual."
        },
        {
         "Question Number": 70,
         "Category": "Enterprise & Equity Value",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "How do you factor in Convertible Preferred Stock in the Enterprise Value calculation?",
         "Answer": "The same way you factor in normal Convertible Bonds: if it's in-the-money, you assume that new shares get created, and if it's not in the money, you count it as Debt."
        },
        {
         "Question Number": 71,
         "Category": "Enterprise & Equity Value",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "How do you factor in Restricted Stock Units (RSUs) and Performance Shares when calculating Diluted Equity Value?",
         "Answer": "RSUs should be added to the common share count, because they are just common shares. The only difference is that the employees who own them have to hold onto them for a number of years before selling them. Performance Shares are similar to Convertible Bonds, but if they're not in-the- money (the share price is below the performance share price target), you do not count them as Debt - you just ignore them altogether. If they are in-the-money, you assume that they are normal common shares and add them to the share count."
        },
        {
         "Question Number": 72,
         "Category": "Enterprise & Equity Value",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "What's the distinction between Options Exercisable vs. Options Outstanding? Which one(s) should you use when calculating share dilution?",
         "Answer": "Options Exercisable vs. Options Outstanding: Normally companies put in place restrictions on when employees can actually exercise options - so even if there are 1 million options outstanding right now, only 500,000 may actually be exercisable even if they're all in-the-money. There's no \"correct\" answer for which one to use here. Some people argue that you should use Options Outstanding because typically, all non-exercisable Options become exercisable in an acquisition, so that's the more accurate way to view it."
        },
        {
         "Question Number": 73,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What are the 3 major valuation methodologies?",
         "Answer": "Comparable Companies, Precedent Transactions and Discounted Cash Flow Analysis."
        },
        {
         "Question Number": 74,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Rank the 3 valuation methodologies from highest to lowest expected value.",
         "Answer": "Trick question - there is no ranking that always holds. In general, Precedent Transactions will be higher than Comparable Companies due to the Control Premium built into acquisitions. Beyond that, a DCF could go either way and it's best to say that it's more variable than other methodologies. Often it produces the highest value, but it can produce the lowest value as well depending on your assumptions."
        },
        {
         "Question Number": 75,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "When would you not use a DCF in a Valuation?",
         "Answer": "You do not use a DCF if the company has unstable or unpredictable cash flows (tech or bio-tech startup) or when debt and working capital serve a fundamentally different role. For example, banks and financial institutions do not re-invest debt and working capital is a huge part of their Balance Sheets - so you wouldn't use a DCF for such companies."
        },
        {
         "Question Number": 76,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What other Valuation methodologies are there?",
         "Answer": "Other methodologies include: • Liquidation Valuation - Valuing a company's assets, assuming they are sold off and then subtracting liabilities to determine how much capital, if any, equity investors receive • Replacement Value - Valuing a company based on the cost of replacing its assets • LBO Analysis - Determining how much a PE firm could pay for a company to hit a \"target\" IRR, usually in the 20-25% range • Sum of the Parts - Valuing each division of a company separately and adding them together at the end • M&A Premiums Analysis - Analyzing M&A deals and figuring out the premium that each buyer paid, and using this to establish what your company is worth • Future Share Price Analysis - Projecting a company's share price based on the P \/ E multiples of the public company comparables, then discounting it back to its present value"
        },
        {
         "Question Number": 77,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "When would you use a Liquidation Valuation?",
         "Answer": "This is most common in bankruptcy scenarios and is used to see whether equity shareholders will receive any capital after the company's debts have been paid off. It is often used to advise struggling businesses on whether it's better to sell off assets separately or to try and sell the entire company."
        },
        {
         "Question Number": 78,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "When would you use Sum of the Parts?",
         "Answer": "This is most often used when a company has completely different, unrelated divisions - a conglomerate like General Electric, for example. If you have a plastics division, a TV and entertainment division, an energy division, a consumer financing division and a technology division, you should not use the same set of Comparable Companies and Precedent Transactions for the entire company. Instead, you should use different sets for each division, value each one separately, and then add them together to get the Combined Value."
        },
        {
         "Question Number": 79,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "When do you use an LBO Analysis as part of your Valuation?",
         "Answer": "Obviously you use this whenever you're looking at a Leveraged Buyout - but it is also used to establish how much a private equity firm could pay, which is usually lower than what companies will pay. It is often used to set a \"floor\" on a possible Valuation for the company you're looking at."
        },
        {
         "Question Number": 80,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What are the most common multiples used in Valuation?",
         "Answer": "The most common multiples are EV\/Revenue, EV\/EBITDA, EV\/EBIT, P\/E (Share Price \/ Earnings per Share), and P\/BV (Share Price \/ Book Value)."
        },
        {
         "Question Number": 81,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What are some examples of industry-specific multiples?",
         "Answer": "Technology (Internet): EV \/ Unique Visitors, EV \/ Pageviews Retail \/ Airlines: EV \/ EBITDAR (Earnings Before Interest, Taxes, Depreciation, Amortization & Rent) Energy: P \/ MCFE, P \/ MCFE \/ D (MCFE = 1 Million Cubic Foot Equivalent, MCFE\/D = MCFE per Day), P \/ NAV (Share Price \/ Net Asset Value) Real Estate Investment Trusts (REITs): Price \/ FFO, Price \/ AFFO (Funds From Operations, Adjusted Funds From Operations) Technology and Energy should be straightforward - you're looking at traffic and energy reserves as value drivers rather than revenue or profit. For Retail \/ Airlines, you often remove Rent because it is a major expense and one that varies significantly between different types of companies. For REITs, Funds From Operations is a common metric that adds back Depreciation and subtracts gains on the sale of property. Depreciation is a non-cash yet extremely large expense in real estate, and gains on sales of properties are assumed to be non-recurring, so FFO is viewed as a \"normalized\" picture of the cash flow the REIT is generating."
        },
        {
         "Question Number": 82,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "When you're looking at an industry-specific multiple like EV \/ Scientists or EV \/ Subscribers, why do you use Enterprise Value rather than Equity Value?",
         "Answer": "You use Enterprise Value because those scientists or subscribers are \"available\" to all the investors (both debt and equity) in a company. The same logic doesn't apply to everything, though - you need to think through the multiple and see which investors the particular metric is \"available\" to."
        },
        {
         "Question Number": 83,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Would an LBO or DCF give a higher valuation?",
         "Answer": "Technically it could go either way, but in most cases the LBO will give you a lower valuation. Here's the easiest way to think about it: with an LBO, you do not get any value from the cash flows of a company in between Year 1 and the final year - you're only valuing it based on its terminal value. With a DCF, by contrast, you're taking into account both the company's cash flows in between and its terminal value, so values tend to be higher. Note: Unlike a DCF, an LBO model by itself does not give a specific valuation. Instead, you set a desired IRR and determine how much you could pay for the company (the valuation) based on that."
        },
        {
         "Question Number": 84,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "How would you present these Valuation methodologies to a company or its investors?",
         "Answer": "Usually you use a \"football field\" chart where you show the valuation range implied by each methodology. You always show a range rather than one specific number. As an example, see page 10 of this document (a Valuation done by Credit Suisse for the Leveraged Buyout of Sungard Data Systems in 2005): http:\/\/edgar.sec.gov\/Archives\/edgar\/data\/789388\/000119312505074184\/dex99c2.htm"
        },
        {
         "Question Number": 85,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "How would you value an apple tree?",
         "Answer": "The same way you would value a company: by looking at what comparable apple trees are worth (relative valuation) and the value of the apple tree's cash flows (intrinsic valuation). Yes, you could do a DCF for anything - even an apple tree."
        },
        {
         "Question Number": 86,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Why can't you use Equity Value \/ EBITDA as a multiple rather than Enterprise Value \/ EBITDA?",
         "Answer": "EBITDA is available to all investors in the company - rather than just equity holders. Similarly, Enterprise Value is also available to all shareholders so it makes sense to pair them together. Equity Value \/ EBITDA, however, is comparing apples to oranges because Equity Value does not reflect the company's entire capital structure - only the part available to equity investors."
        },
        {
         "Question Number": 87,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "When would a Liquidation Valuation produce the highest value?",
         "Answer": "This is highly unusual, but it could happen if a company had substantial hard assets but the market was severely undervaluing it for a specific reason (such as an earnings miss or cyclicality). As a result, the company's Comparable Companies and Precedent Transactions would likely produce lower values as well - and if its assets were valued highly enough, Liquidation Valuation might give a higher value than other methodologies."
        },
        {
         "Question Number": 88,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Let's go back to 2004 and look at Facebook back when it had no profit and no revenue. How would you value it?",
         "Answer": "You would use Comparable Companies and Precedent Transactions and look at more \"creative\" multiples such as EV\/Unique Visitors and EV\/Pageviews rather than EV\/Revenue or EV\/EBITDA. You would not use a \"far in the future DCF\" because you can't reasonably predict cash flows for a company that is not even making money yet. This is a very common wrong answer given by interviewees. When you can't predict cash flow, use other metrics - don't try to predict cash flow anyway!"
        },
        {
         "Question Number": 89,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What would you use in conjunction with Free Cash Flow multiples - Equity Value or Enterprise Value?",
         "Answer": "Trick question. For Unlevered Free Cash Flow, you would use Enterprise Value, but for Levered Free Cash Flow you would use Equity Value. Remember, Unlevered Free Cash Flow excludes Interest and thus represents money available to all investors, whereas Levered already includes Interest and the money is therefore only available to equity investors. Debt investors have already \"been paid\" with the interest payments they received."
        },
        {
         "Question Number": 90,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "You never use Equity Value \/ EBITDA, but are there any cases where you might use Equity Value \/ Revenue?",
         "Answer": "Never say never. It's very rare to see this, but sometimes large financial institutions with big cash balances have negative Enterprise Values - so you might use Equity Value \/ Revenue instead. You might see Equity Value \/ Revenue if you've listed a set of financial and nonfinancial companies on a slide, you're showing Revenue multiples for the non-financial companies, and you want to show something similar for the financials. Note, however, that in most cases you would be using other multiples such as P\/E and P\/BV with banks anyway."
        },
        {
         "Question Number": 91,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "How do you select Comparable Companies \/ Precedent Transactions?",
         "Answer": "The 3 main ways to select companies and transactions: 1. Industry classification 2. Financial criteria (Revenue, EBITDA, etc.) 3. Geography For Precedent Transactions, you often limit the set based on date and only look at transactions within the past 1-2 years. The most important factor is industry - that is always used to screen for companies\/transactions, and the rest may or may not be used depending on how specific you want to be. Here are a few examples: Comparable Company Screen: Oil & gas producers with market caps over $5 billion Comparable Company Screen: Digital media companies with over $100 million in revenue Precedent Transaction Screen: Airline M&A transactions over the past 2 years involving sellers with over $1 billion in revenue Precedent Transaction Screen: Retail M&A transactions over the past year"
        },
        {
         "Question Number": 92,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "How do you apply the 3 valuation methodologies to actually get a value for the company you're looking at?",
         "Answer": "Sometimes this simple fact gets lost in discussion of Valuation methodologies. You take the median multiple of a set of companies or transactions, and then multiply it by the relevant metric from the company you're valuing. Example: If the median EBITDA multiple from your set of Precedent Transactions is 8x and your company's EBITDA is $500 million, the implied Enterprise Value would be $4 billion. To get the \"football field\" valuation graph you often see, you look at the minimum, maximum, 25th percentile and 75th percentile in each set as well and create a range of values based on each methodology."
        },
        {
         "Question Number": 93,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What do you actually use a valuation for?",
         "Answer": "Usually you use it in pitch books and in client presentations when you're providing updates and telling them what they should expect for their own valuation. It's also used right before a deal closes in a Fairness Opinion, a document a bank creates that \"proves\" the value their client is paying or receiving is \"fair\" from a financial point of view. Valuations can also be used in defense analyses, merger models, LBO models, DCFs (because terminal multiples are based off of comps), and pretty much anything else in finance."
        },
        {
         "Question Number": 94,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Why would a company with similar growth and profitability to its Comparable Companies be valued at a premium?",
         "Answer": "This could happen for a number of reasons: • The company has just reported earnings well-above expectations and its stock price has risen recently. • It has some type of competitive advantage not reflected in its financials, such as a key patent or other intellectual property. • It has just won a favorable ruling in a major lawsuit. • It is the market leader in an industry and has greater market share than its competitors."
        },
        {
         "Question Number": 95,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What are the flaws with public company comparables?",
         "Answer": "• No company is 100% comparable to another company. • The stock market is \"emotional\" - your multiples might be dramatically higher or lower on certain dates depending on the market's movements. • Share prices for small companies with thinly-traded stocks may not reflect their full value."
        },
        {
         "Question Number": 96,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "How do you take into account a company's competitive advantage in a valuation?",
         "Answer": "1. Look at the 75th percentile or higher for the multiples rather than the Medians. 2. Add in a premium to some of the multiples. 3. Use more aggressive projections for the company. In practice you rarely do all of the above - these are just possibilities."
        },
        {
         "Question Number": 97,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Do you ALWAYS use the median multiple of a set of public company comparables or precedent transactions?",
         "Answer": "There's no \"rule\" that you have to do this, but in most cases you do because you want to use values from the middle range of the set. But if the company you're valuing is distressed, is not performing well, or is at a competitive disadvantage, you might use the 25th percentile or something in the lower range instead - and vice versa if it's doing well."
        },
        {
         "Question Number": 98,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "You mentioned that Precedent Transactions usually produce a higher value than Comparable Companies - can you think of a situation where this is not the case?",
         "Answer": "Sometimes this happens when there is a substantial mismatch between the M&A market and the public market. For example, no public companies have been acquired recently but there have been a lot of small private companies acquired at extremely low valuations. For the most part this generalization is true but keep in mind that there are exceptions to almost every \"rule\" in finance."
        },
        {
         "Question Number": 99,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What are some flaws with precedent transactions?",
         "Answer": "• Past transactions are rarely 100% comparable - the transaction structure, size of the company, and market sentiment all have huge effects. • Data on precedent transactions is generally more difficult to find than it is for public company comparables, especially for acquisitions of small private companies."
        },
        {
         "Question Number": 100,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Two companies have the exact same financial profile and are bought by the same acquirer, but the EBITDA multiple for one transaction is twice the multiple of the other transaction - how could this happen?",
         "Answer": "Possible reasons: 1. One process was more competitive and had a lot more companies bidding on the target. 2. One company had recent bad news or a depressed stock price so it was acquired at a discount. 3. They were in industries with different median multiples."
        },
        {
         "Question Number": 101,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Why does Warren Buffett prefer EBIT multiples to EBITDA multiples?",
         "Answer": "Warren Buffett once famously said, \"Does management think the tooth fairy pays for capital expenditures?\" He dislikes EBITDA because it excludes the often sizable Capital Expenditures companies make and hides how much cash they are actually using to finance their operations. In some industries there is also a large gap between EBIT and EBITDA - anything that is very capital-intensive, for example, will show a big disparity."
        },
        {
         "Question Number": 102,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "The EV \/ EBIT, EV \/ EBITDA, and P \/ E multiples all measure a company's profitability. What's the difference between them, and when do you use each one?",
         "Answer": "P \/ E depends on the company's capital structure whereas EV \/ EBIT and EV \/ EBITDA are capital structure-neutral. Therefore, you use P \/ E for banks, financial institutions, and other companies where interest payments \/ expenses are critical. EV \/ EBIT includes Depreciation & Amortization whereas EV \/ EBITDA excludes it - you're more likely to use EV \/ EBIT in industries where D&A is large and where capital expenditures and fixed assets are important (e.g. manufacturing), and EV \/ EBITDA in industries where fixed assets are less important and where D&A is comparatively smaller (e.g. Internet companies)."
        },
        {
         "Question Number": 103,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "If you were buying a vending machine business, would you pay a higher multiple for a business where you owned the machines and they depreciated normally, or one in which you leased the machines? The cost of depreciation and lease are the same dollar amounts and everything else is held constant.",
         "Answer": "You would pay more for the one where you lease the machines. Enterprise Value would be the same for both companies, but with the depreciated situation the charge is not reflected in EBITDA - so EBITDA is higher, and the EV \/ EBITDA multiple is lower as a result. For the leased situation, the lease would show up in SG&A so it would be reflected in EBITDA, making EBITDA lower and the EV \/ EBITDA multiple higher."
        },
        {
         "Question Number": 104,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "How do you value a private company?",
         "Answer": "You use the same methodologies as with public companies: public company comparables, precedent transactions, and DCF. But there are some differences: • You might apply a 10-15% (or more) discount to the public company comparable multiples because the private company you're valuing is not as \"liquid\" as the public comps. • You can't use a premiums analysis or future share price analysis because a private company doesn't have a share price. • Your valuation shows the Enterprise Value for the company as opposed to the implied per-share price as with public companies. • A DCF gets tricky because a private company doesn't have a market capitalization or Beta - you would probably just estimate WACC based on the public comps' WACC rather than trying to calculate it."
        },
        {
         "Question Number": 105,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Let's say we're valuing a private company. Why might we discount the public company comparable multiples but not the precedent transaction multiples?",
         "Answer": "There's no discount because with precedent transactions, you're acquiring the entire company - and once it's acquired, the shares immediately become illiquid. But shares - the ability to buy individual \"pieces\" of a company rather than the whole thing - can be either liquid (if it's public) or illiquid (if it's private). Since shares of public companies are always more liquid, you would discount public company comparable multiples to account for this."
        },
        {
         "Question Number": 106,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Can you use private companies as part of your valuation?",
         "Answer": "Only in the context of precedent transactions - it would make no sense to include them for public company comparables or as part of the Cost of Equity \/ WACC calculation in a DCF because they are not public and therefore have no values for market cap or Beta."
        },
        {
         "Question Number": 107,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "How do you value banks and financial institutions differently from other companies?",
         "Answer": "You mostly use the same methodologies, except: • You look at P \/ E and P \/ BV (Book Value) multiples rather than EV \/ Revenue, EV \/ EBITDA, and other \"normal\" multiples, since banks have unique capital structures. • You pay more attention to bank-specific metrics like NAV (Net Asset Value) and you might screen companies and precedent transactions based on those instead. • Rather than a DCF, you use a Dividend Discount Model (DDM) which is similar but is based on the present value of the company's dividends rather than its free cash flows. You need to use these methodologies and multiples because interest is a critical component of a bank's revenue and because debt is part of its business model rather than just a way to finance acquisitions or expand the business."
        },
        {
         "Question Number": 108,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Walk me through an IPO valuation for a company that's about to go public.",
         "Answer": "1. Unlike normal valuations, for an IPO valuation we only care about public company comparables. 2. After picking the public company comparables we decide on the most relevant multiple to use and then estimate our company's Enterprise Value based on that. 3. Once we have the Enterprise Value, we work backward to get to Equity Value and also subtract the IPO proceeds because this is \"new\" cash. 4. Then we divide by the total number of shares (old and newly created) to get its per-share price. When people say \"An IPO priced at...\" this is what they're referring to. If you were using P \/ E or any other \"Equity Value-based multiple\" for the multiple in step #2 here, then you would get to Equity Value instead and then subtract the IPO proceeds from there."
        },
        {
         "Question Number": 109,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "I'm looking at financial data for a public company comparable, and it's April (Q2) right now. Walk me through how you would \"calendarize\" this company's financial statements to show the Trailing Twelve Months as opposed to just the last Fiscal Year.",
         "Answer": "The \"formula\" to calendarize financial statements is as follows: TTM = Most Recent Fiscal Year + New Partial Period - Old Partial Period So in the example above, we would take the company's Q1 numbers, add the most recent fiscal year's numbers, and then subtract the Q1 numbers from that most recent fiscal year. For US companies you can find these quarterly numbers in the 10-Q; for international companies they're in the \"interim\" reports."
        },
        {
         "Question Number": 110,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Walk me through an M&A premiums analysis.",
         "Answer": "The purpose of this analysis is to look at similar transactions and see the premiums that buyers have paid to sellers' share prices when acquiring them. For example, if a company is trading at $10.00\/share and the buyer acquires it for $15.00\/share, that's a 50% premium. 1. First, select the precedent transactions based on industry, date (past 2-3 years for example), and size (example: over $1 billion market cap). 2. For each transaction, get the seller's share price 1 day, 20 days, and 60 days before the transaction was announced (you can also look at even longer intervals, or 30 days, 45 days, etc.). 3. Then, calculate the 1-day premium, 20-day premium, etc. by dividing the per-share purchase price by the appropriate share prices on each day. 4. Get the medians for each set, and then apply them to your company's current share price, share price 20 days ago, etc. to estimate how much of a premium a buyer might pay for it. Note that you only use this analysis when valuing public companies because private companies don't have share prices. Sometimes the set of companies here is exactly the same as your set of precedent transactions but typically it is broader."
        },
        {
         "Question Number": 111,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Walk me through a future share price analysis.",
         "Answer": "The purpose of this analysis is to project what a company's share price might be 1 or 2 years from now and then discount it back to its present value. 1. Get the median historical (usually TTM) P \/ E of your public company comparables. 2. Apply this P \/ E multiple to your company's 1-year forward or 2-year forward projected EPS to get its implied future share price. 3. Then, discount this back to its present value by using a discount rate in-line with the company's Cost of Equity figures. You normally look at a range of P \/ E multiples as well as a range of discount rates for this type of analysis, and make a sensitivity table with these as inputs."
        },
        {
         "Question Number": 112,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Both M&A premiums analysis and precedent transactions involve looking at previous M&A transactions. What's the difference in how we select them?",
         "Answer": "• All the sellers in the M&A premiums analysis must be public. • Usually we use a broader set of transactions for M&A premiums - we might use fewer than 10 precedent transactions but we might have dozens of M&A premiums. The industry and financial screens are usually less stringent. • Aside from those, the screening criteria is similar - financial, industry, geography, and date."
        },
        {
         "Question Number": 113,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Walk me through a Sum-of-the-Parts analysis.",
         "Answer": "In a Sum-of-the-Parts analysis, you value each division of a company using separate comparables and transactions, get to separate multiples, and then add up each division's value to get the total for the company. Example: We have a manufacturing division with $100 million EBITDA, an entertainment division with $50 million EBITDA and a consumer goods division with $75 million EBITDA. We've selected comparable companies and transactions for each division, and the median multiples come out to 5x EBITDA for manufacturing, 8x EBITDA for entertainment, and 4x EBITDA for consumer goods. Our calculation would be $100 5x + $50 8x + $75 * 4x = $1.2 billion for the company's total value."
        },
        {
         "Question Number": 114,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "How do you value Net Operating Losses and take them into account in a valuation?",
         "Answer": "You value NOLs based on how much they'll save the company in taxes in future years, and then take the present value of the sum of tax savings in future years. Two ways to assess the tax savings in future years: 1. Assume that a company can use its NOLs to completely offset its taxable income until the NOLs run out. 2. In an acquisition scenario, use Section 382 and multiply the adjusted long-term rate (http:\/\/pmstax.com\/afr\/exemptAFR.shtml) by the equity purchase price of the seller to determine the maximum allowed NOL usage in each year - and then use that to figure out the offset to taxable income. You might look at NOLs in a valuation but you rarely add them in - if you did, they would be similar to cash and you would subtract NOLs to go from Equity Value to Enterprise Value, and vice versa."
        },
        {
         "Question Number": 115,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "I have a set of public company comparables and need to get the projections from equity research. How do I select which report to use?",
         "Answer": "This varies by bank and group, but two common methods: 1. You pick the report with the most detailed information. 2. You pick the report with numbers in the middle of the range. Note that you do not pick reports based on which bank they're coming from. So if you're at Goldman Sachs, you would not pick all Goldman Sachs equity research - in fact that would be bad because then your valuation would not be objective."
        },
        {
         "Question Number": 116,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "I have a set of precedent transactions but I'm missing information like EBITDA for a lot of the companies - how can I find it if it's not available via public sources?",
         "Answer": "1. Search online and see if you can find press releases or articles in the financial press with these numbers. 2. Failing that, look in equity research for the buyer around the time of the transaction and see if any of the analysts estimate the seller's numbers. 3. Also look on online sources like Capital IQ and Factset and see if any of them disclose numbers or give estimates."
        },
        {
         "Question Number": 117,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "How far back and forward do we usually go for public company comparable and precedent transaction multiples?",
         "Answer": "Usually you look at the TTM (Trailing Twelve Months) period for both sets, and then you look forward either 1 or 2 years. You're more likely to look backward more than 1 year and go forward more than 2 years for public company comparables; for precedent transactions it's odd to go forward more than 1 year because your information is more limited."
        },
        {
         "Question Number": 118,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "I have one company with a 40% EBITDA margin trading at 8x EBITDA, and another company with a 10% EBITDA margin trading at 16x EBITDA. What's the problem with comparing these two valuations directly?",
         "Answer": "There's no \"rule\" that says this is wrong or not allowed, but it can be misleading to compare companies with dramatically different margins. Due to basic arithmetic, the 40% margin company will usually have a lower multiple - whether or not its actual value is lower. In this situation, we might consider screening based on margins and remove the outliers - you would never try to \"normalize\" the EBITDA multiples based on margins."
        },
        {
         "Question Number": 119,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Walk me through how we might value an oil & gas company and how it's different from a \"standard\" company.",
         "Answer": "You use the same methodologies, except: • You look at industry-specific multiples like P \/ MCFE and P \/ NAV in addition to the more standard ones. • You need to project the prices of commodities like oil and natural gas, and also the company's reserves to determine its revenue and cash flows in future years. • Rather than a DCF, you use a NAV (Net Asset Value) model - it's similar, but everything flows from the company's reserves rather than simple revenue growth \/ EBITDA margin projections. In addition to all of the above, there are also some accounting complications with energy companies and you need to think about what a \"proven\" reserve is vs. what is more speculative."
        },
        {
         "Question Number": 120,
         "Category": "Valuation",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Walk me through how we would value a REIT (Real Estate Investment Trust) and how it differs from a \"normal\" company.",
         "Answer": "Similar to energy, real estate is asset-intensive and a company's value depends on how much cash flow specific properties generate. • You look at Price \/ FFO (Funds From Operations) and Price \/ AFFO (Adjusted Funds From Operations), which add back Depreciation and subtract gains on property sales; NAV (Net Asset Value) is also important. • You value properties by dividing Net Operating Income (NOI) (Property's Gross Income - Operating Expenses) by the capitalization rate (based on market data). • Replacement Valuation is more common because you can actually estimate the cost of buying new land and building new properties. • A DCF is still a DCF, but it flows from specific properties and it might be useless depending on what kind of company you're valuing."
        },
        {
         "Question Number": 121,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Walk me through a DCF",
         "Answer": "\"A DCF values a company based on the Present Value of its Cash Flows and the Present Value of its Terminal Value. First, you project out a company's financials using assumptions for revenue growth, expenses and Working Capital; then you get down to Free Cash Flow for each year, which you then sum up and discount to a Net Present Value, based on your discount rate - usually the Weighted Average Cost of Capital. Once you have the present value of the Cash Flows, you determine the company's Terminal Value, using either the Multiples Method or the Gordon Growth Method, and then also discount that back to its Net Present Value using WACC. Finally, you add the two together to determine the company's Enterprise Value.\""
        },
        {
         "Question Number": 122,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Walk me through how you get from Revenue to Free Cash Flow in the projections.",
         "Answer": "Subtract COGS and Operating Expenses to get to Operating Income (EBIT). Then, multiply by (1 - Tax Rate), add back Depreciation and other non-cash charges, and subtract Capital Expenditures and the change in Working Capital. Note: This gets you to Unlevered Free Cash Flow since you went off EBIT rather than EBT. You might want to confirm that this is what the interviewer is asking for."
        },
        {
         "Question Number": 123,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What's an alternate way to calculate Free Cash Flow aside from taking Net Income, adding back Depreciation, and subtracting Changes in Operating Assets \/ Liabilities and CapEx?",
         "Answer": "Take Cash Flow From Operations and subtract CapEx - that gets you to Levered Cash Flow. To get to Unlevered Cash Flow, you then need to add back the tax-adjusted Interest Expense and subtract the tax-adjusted Interest Income. Tax adjusted interest expense = interest * 1- tax rate"
        },
        {
         "Question Number": 124,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Why do you use 5 or 10 years for DCF projections?",
         "Answer": "That's usually about as far as you can reasonably predict into the future. Less than 5 years would be too short to be useful, and over 10 years is too difficult to predict for most companies."
        },
        {
         "Question Number": 125,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What do you usually use for the discount rate?",
         "Answer": "Normally you use WACC (Weighted Average Cost of Capital), though you might also use Cost of Equity depending on how you've set up the DCF."
        },
        {
         "Question Number": 126,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "How do you calculate WACC?",
         "Answer": "The formula is: Cost of Equity (% Equity) + Cost of Debt (% Debt) (1 - Tax Rate) + Cost of Preferred (% Preferred). In all cases, the percentages refer to how much of the company's capital structure is taken up by each component. For Cost of Equity, you can use the Capital Asset Pricing Model (CAPM - see the next question) and for the others you usually look at comparable companies\/debt issuances and the interest rates and yields issued by similar companies to get estimates"
        },
        {
         "Question Number": 127,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "How do you calculate the Cost of Equity?",
         "Answer": "Cost of Equity = Risk-Free Rate + Beta * Equity Risk Premium The risk-free rate represents how much a 10-year or 20-year US Treasury should yield; Beta is calculated based on the \"riskiness\" of Comparable Companies and the Equity Risk Premium is the % by which stocks are expected to out-perform \"risk-less\" assets. Normally you pull the Equity Risk Premium from a publication called Ibbotson's. Note: This formula does not tell the whole story. Depending on the bank and how precise you want to be, you could also add in a \"size premium\" and \"industry premium\" to account for how much a company is expected to out-perform its peers is according to its market cap or industry. Small company stocks are expected to out-perform large company stocks and certain industries are expected to out-perform others, and these premiums reflect these expectations."
        },
        {
         "Question Number": 128,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "How do you get to Beta in the Cost of Equity calculation?",
         "Answer": "You look up the Beta for each Comparable Company (usually on Bloomberg), un-lever each one, take the median of the set and then lever it based on your company's capital structure. Then you use this Levered Beta in the Cost of Equity calculation. For your reference, the formulas for un-levering and re-levering Beta are below: Un-Levered Beta = Levered Beta \/ (1 + ((1 - Tax Rate) x (Total Debt\/Equity))) Levered Beta = Un-Levered Beta x (1 + ((1 - Tax Rate) x (Total Debt\/Equity)))"
        },
        {
         "Question Number": 129,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Levered",
         "Answer": "After company has met its financial obligations"
        },
        {
         "Question Number": 131,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Would you expect a manufacturing company or a technology company to have a higher Beta?",
         "Answer": "A technology company, because technology is viewed as a \"riskier\" industry than manufacturing."
        },
        {
         "Question Number": 132,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Let's say that you use Levered Free Cash Flow rather than Unlevered Free Cash Flow in your DCF - what is the effect?",
         "Answer": "Levered Free Cash Flow gives you Equity Value rather than Enterprise Value, since the cash flow is only available to equity investors (debt investors have already been \"paid\" with the interest payments)."
        },
        {
         "Question Number": 133,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "If you use Levered Free Cash Flow, what should you use as the Discount Rate?",
         "Answer": "You would use the Cost of Equity rather than WACC since we're not concerned with Debt or Preferred Stock in this case - we're calculating Equity Value, not Enterprise Value."
        },
        {
         "Question Number": 134,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "How do you calculate the Terminal Value?",
         "Answer": "You can either apply an exit multiple to the company's Year 5 EBITDA, EBIT or Free Cash Flow (Multiples Method) or you can use the Gordon Growth method to estimate its value based on its growth rate into perpetuity. The formula for Terminal Value using Gordon Growth is: Terminal Value = Year 5 Free Cash Flow * (1 + Growth Rate) \/ (Discount Rate - Growth Rate)."
        },
        {
         "Question Number": 135,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Why would you use Gordon Growth rather than the Multiples Method to calculate the Terminal Value?",
         "Answer": "In banking, you almost always use the Multiples Method to calculate Terminal Value in a DCF. It's much easier to get appropriate data for exit multiples since they are based on Comparable Companies - picking a long-term growth rate, by contrast, is always a shot in the dark. However, you might use Gordon Growth if you have no good Comparable Companies or if you have reason to believe that multiples will change significantly in the industry several years down the road. For example, if an industry is very cyclical you might be better off using long-term growth rates rather than exit multiples."
        },
        {
         "Question Number": 136,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What's an appropriate growth rate to use when calculating the Terminal Value?",
         "Answer": "Normally you use the country's long-term GDP growth rate, the rate of inflation, or something similarly conservative. For companies in mature economies, a long-term growth rate over 5% would be quite aggressive since most developed economies are growing at less than 5% per year."
        },
        {
         "Question Number": 137,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "How do you select the appropriate exit multiple when calculating Terminal Value?",
         "Answer": "Normally you look at the Comparable Companies and pick the median of the set, or something close to it. As with almost anything else in finance, you always show a range of exit multiples and what the Terminal Value looks like over that range rather than picking one specific number. So if the median EBITDA multiple of the set were 8x, you might show a range of values using multiples from 6x to 10x."
        },
        {
         "Question Number": 138,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Which method of calculating Terminal Value will give you a higher valuation?",
         "Answer": "It's hard to generalize because both are highly dependent on the assumptions you make. In general, the Multiples Method will be more variable than the Gordon Growth method because exit multiples tend to span a wider range than possible long-term growth rates."
        },
        {
         "Question Number": 139,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What's the flaw with basing terminal multiples on what public company comparables are trading at?",
         "Answer": "The median multiples may change greatly in the next 5-10 years so it may no longer be accurate by the end of the period you're looking at. This is why you normally look at a wide range of multiples and do a sensitivity to see how the valuation changes over that range. This method is particularly problematic with cyclical industries (e.g. semiconductors)."
        },
        {
         "Question Number": 140,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "How do you know if your DCF is too dependent on future assumptions?",
         "Answer": "The \"standard\" answer: if significantly more than 50% of the company's Enterprise Value comes from its Terminal Value, your DCF is probably too dependent on future assumptions. In reality, almost all DCFs are \"too dependent on future assumptions\" - it's actually quite rare to see a case where the Terminal Value is less than 50% of the Enterprise Value. But when it gets to be in the 80-90% range, you know that you may need to re-think your assumptions..."
        },
        {
         "Question Number": 141,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Should Cost of Equity be higher for a $5 billion or $500 million market cap company?",
         "Answer": "It should be higher for the $500 million company, because all else being equal, smaller companies are expected to outperform large companies in the stock market (and therefore be \"more risky\"). Using a Size Premium in your calculation would also ensure that Cost of Equity is higher for the $500 million company."
        },
        {
         "Question Number": 142,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What about WACC - will it be higher for a $5 billion or $500 million company?",
         "Answer": "This is a bit of a trick question because it depends on whether or not the capital structure is the same for both companies. If the capital structure is the same in terms of percentages and interest rates and such, then WACC should be higher for the $500 million company for the same reasons as mentioned above. If the capital structure is not the same, then it could go either way depending on how much debt\/preferred stock each one has and what the interest rates are."
        },
        {
         "Question Number": 143,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What's the relationship between debt and Cost of Equity?",
         "Answer": "More debt means that the company is more risky, so the company's Levered Beta will be higher - all else being equal, additional debt would raise the Cost of Equity, and less debt would lower the Cost of Equity."
        },
        {
         "Question Number": 144,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Cost of Equity tells us what kind of return an equity investor can expect for investing in a given company - but what about dividends? Shouldn't we factor dividend yield into the formula?",
         "Answer": "Trick question. Dividend yields are already factored into Beta, because Beta describes returns in excess of the market as a whole - and those returns include dividends."
        },
        {
         "Question Number": 145,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "How can we calculate Cost of Equity WITHOUT using CAPM?",
         "Answer": "There is an alternate formula: Cost of Equity = (Dividends per Share \/ Share Price) + Growth Rate of Dividends This is less common than the \"standard\" formula but sometimes you use it for companies where dividends are more important or when you lack proper information on Beta and the other variables that go into calculating Cost of Equity with CAPM."
        },
        {
         "Question Number": 146,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Two companies are exactly the same, but one has debt and one does not - which one will have the higher WACC?",
         "Answer": "This is tricky - the one without debt will have a higher WACC up to a certain point, because debt is \"less expensive\" than equity. Why? • Interest on debt is tax-deductible (hence the (1 - Tax Rate) multiplication in the WACC formula). • Debt is senior to equity in a company's capital structure - debt holders would be paid first in a liquidation or bankruptcy. • Intuitively, interest rates on debt are usually lower than the Cost of Equity numbers you see (usually over 10%). As a result, the Cost of Debt portion of WACC will contribute less to the total figure than the Cost of Equity portion will. However, the above is true only to a certain point. Once a company's debt goes up high enough, the interest rate will rise dramatically to reflect the additional risk and so the Cost of Debt would start to increase - if it gets high enough, it might become higher than Cost of Equity and additional debt would increase WACC. It's a \"U-shape\" curve where debt decreases WACC to a point, then starts increasing it."
        },
        {
         "Question Number": 147,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Which has a greater impact on a company's DCF valuation - a 10% change in revenue or a 1% change in the discount rate?",
         "Answer": "You should start by saying, \"it depends\" but most of the time the 10% difference in revenue will have more of an impact. That change in revenue doesn't affect only the current year's revenue, but also the revenue\/EBITDA far into the future and even the terminal value."
        },
        {
         "Question Number": 148,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What about a 1% change in revenue vs. a 1% change in the discount rate?",
         "Answer": "In this case the discount rate is likely to have a bigger impact on the valuation, though the correct answer should start with, \"It could go either way, but most of the time...\""
        },
        {
         "Question Number": 149,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "How do you calculate WACC for a private company?",
         "Answer": "This is problematic because private companies don't have market caps or Betas. In this case you would most likely just estimate WACC based on work done by auditors or valuation specialists, or based on what WACC for comparable public companies is."
        },
        {
         "Question Number": 150,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What should you do if you don't believe management's projections for a DCF model?",
         "Answer": "You can take a few different approaches: • You can create your own projections. • You can modify management's projections downward to make them more conservative. • You can show a sensitivity table based on different growth rates and margins and show the values assuming managements' projections and assuming a more conservative set of numbers. In reality, you'd probably do all of these if you had unrealistic projections."
        },
        {
         "Question Number": 151,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Why would you not use a DCF for a bank or other financial institution?",
         "Answer": "Banks use debt differently than other companies and do not re-invest it in the business - they use it to create products instead. Also, interest is a critical part of banks' business models and working capital takes up a huge part of their Balance Sheets - so a DCF for a financial institution would not make much sense. For financial institutions, it's more common to use a dividend discount model for valuation purposes."
        },
        {
         "Question Number": 152,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What types of sensitivity analyses would we look at in a DCF?",
         "Answer": "Example sensitivities: • Revenue Growth vs. Terminal Multiple • EBITDA Margin vs. Terminal Multiple • Terminal Multiple vs. Discount Rate • Long-Term Growth Rate vs. Discount Rate And any combination of these (except Terminal Multiple vs. Long-Term Growth Rate, which would make no sense). This compares enterprise value with different values of these numbers"
        },
        {
         "Question Number": 153,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "A company has a high debt load and is paying off a significant portion of its principal each year. How do you account for this in a DCF?",
         "Answer": "Trick question. You don't account for this at all in a DCF, because paying off debt principal shows up in Cash Flow from Financing on the Cash Flow Statement - but we only go down to Cash Flow from Operations and then subtract Capital Expenditures to get to Free Cash Flow. If we were looking at Levered Free Cash Flow, then our interest expense would decline in future years due to the principal being paid off - but we still wouldn't count the principal repayments themselves anywhere."
        },
        {
         "Question Number": 154,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Is interest an operating expense",
         "Answer": "No, it's a non-operating expense."
        },
        {
         "Question Number": 155,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Is depreciation an operating expense",
         "Answer": "Yes"
        },
        {
         "Question Number": 156,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Does operating cash flow account for interest",
         "Answer": "yes because it starts with net income"
        },
        {
         "Question Number": 157,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Three interpretations of WACC",
         "Answer": "opportunity cost, cost of capital, required rate of return"
        },
        {
         "Question Number": 158,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Levered Beta =",
         "Answer": "Un-Levered Beta x (1 + ((1 - Tax Rate) x (Total Debt\/Equity)))"
        },
        {
         "Question Number": 159,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "How does a increase in current liabilities affect DCF",
         "Answer": "Makes DCF higher, smaller NWC, subtract less"
        },
        {
         "Question Number": 160,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Decrease in current liabilities",
         "Answer": "Uses cash, increase in current assets uses cash, decrease in current assets gives you back cash"
        },
        {
         "Question Number": 161,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Explain why we would use the mid-year convention in a DCF.",
         "Answer": "You use it to represent the fact that a company's cash flow does not come 100% at the end of each year - instead, it comes in evenly throughout each year. In a DCF without mid-year convention, we would use discount periods of 1 for the first year, 2 for the second year, and 3 for the third year, and so on. With mid-year convention, we would instead use 0.5 for the first year, 1.5 for the second year, 2.5 for the third year, and so on."
        },
        {
         "Question Number": 162,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "What discount period numbers would I use for the mid-year convention if I have a stub period - e.g. Q4 of Year 1 - in my DCF?",
         "Answer": "The rule is that you divide the stub period by 2, and then you simply subtract .5 from the \"normal\" discount periods for the future years."
        },
        {
         "Question Number": 163,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "How does the terminal value calculation change when we use the mid-year convention?",
         "Answer": "When you're discounting the terminal value back to the present value, you use different numbers for the discount period depending on whether you're using the Multiples Method or Gordon Growth Method: Multiples Method: You add 0.5 to the final year discount number to reflect the fact that you're assuming the company gets sold at the end of the year. Gordon Growth Method: You use the final year discount number as is, because you're assuming the cash flows grow into perpetuity and that they are still received throughout the year rather than just at the end."
        },
        {
         "Question Number": 164,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "If I'm working with a public company in a DCF, how do I calculate its per-share value?",
         "Answer": "Once you get to Enterprise Value, ADD cash and then subtract debt, preferred stock, and minority interest (and any other debt-like items) to get to Equity Value. Then, you need to use a circular calculation that takes into account the basic shares outstanding, warrants, convertibles, and other dilutive securities. It's circular because the dilution from these depends on the per-share price - but the per-share price depends on number of shares outstanding, which depends on the per-share price. To resolve this, you need to enable iterative calculations in Excel so that it can cycle through to find an approximate per-share price."
        },
        {
         "Question Number": 165,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Walk me through a Dividend Discount Model (DDM) that you would use in place of a normal DCF for financial institutions.",
         "Answer": "The mechanics are the same as a DCF, but we use dividends rather than free cash flows: 1. Project out the company's earnings, down to earnings per share (EPS). 2. Assume a dividend payout ratio - what percentage of the EPS actually gets paid out to shareholders in the form of dividends - based on what the firm has done historically and how much regulatory capital it needs. 3. Use this to calculate dividends over the next 5-10 years. 4. Discount each dividend to its present value based on Cost of Equity - NOT WACC - and then sums these up. 5. Calculate terminal value based on P\/E and EPS in the final year, and then discount this to its present value based on Cost of Equity. 6. Sum the present value of the terminal value and the present values of the dividends to get the company's net present per-share value."
        },
        {
         "Question Number": 166,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "When you're calculating WACC, let's say that the company has convertible debt. Do you count this as debt when calculating Levered Beta for the company?",
         "Answer": "Trick question: If the convertible bond is in-the-money then you do not count it as debt but instead assume that it contributes to dilution, so the company's Equity Value is higher. If it's out-of-the money then you count it as debt and use the interest rate on the convertible for Cost of Debt."
        },
        {
         "Question Number": 167,
         "Category": "DCF",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "We're creating a DCF for a company that is planning to buy a factory for $100 in cash (no debt or other financing) in Year 4. Currently the present value of its Enterprise Value according to the DCF is $200. How would we change the DCF to account for the factory purchase, and what would our new Enterprise Value be?",
         "Answer": "In this scenario, you would add CapEx spending of $100 in year 4 of the DCF, which would reduce Free Cash Flow in that year by $100. The Enterprise Value, in turn, would fall by the present value of that $100 decrease in Free Cash Flow. The actual math here is messy but you would calculate the present value by dividing $100 by ((1 + Discount Rate)^4 - the \"4\" just represents year 4 here. Then you would subtract this amount from the Enterprise Value."
        },
        {
         "Question Number": 168,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Walk me through a basic merger model.",
         "Answer": "\"A merger model is used to analyze the financial profiles of 2 companies, the purchase price and how the purchase is made, and determines whether the buyer's EPS increases or decreases. Step 1 is making assumptions about the acquisition - the price and whether it was cash, stock or debt or some combination of those. Next, you determine the valuations and shares outstanding of the buyer and seller and project out an Income Statement for each one. Finally, you combine the Income Statements, adding up line items such as Revenue and Operating Expenses, and adjusting for Foregone Interest on Cash and Interest Paid on Debt in the Combined Pre-Tax Income line; you apply the buyer's Tax Rate to get the Combined Net Income, and then divide by the new share count to determine the combined EPS.\""
        },
        {
         "Question Number": 169,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What's the difference between a merger and an acquisition?",
         "Answer": "There's always a buyer and a seller in any M&A deal - the difference between \"merger\" and \"acquisition\" is more semantic than anything. In a merger the companies are close to the same size, whereas in an acquisition the buyer is significantly larger."
        },
        {
         "Question Number": 170,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Why would a company want to acquire another company?",
         "Answer": "Several possible reasons: • The buyer wants to gain market share by buying a competitor. • The buyer needs to grow more quickly and sees an acquisition as a way to do that. • The buyer believes the seller is undervalued. • The buyer wants to acquire the seller's customers so it can up-sell and cross-sell to them. • The buyer thinks the seller has a critical technology, intellectual property or some other \"secret sauce\" it can use to significantly enhance its business. • The buyer believes it can achieve significant synergies and therefore make the deal accretive for its shareholders."
        },
        {
         "Question Number": 171,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Why would an acquisition be dilutive?",
         "Answer": "An acquisition is dilutive if the additional amount of Net Income the seller contributes is not enough to offset the buyer's foregone interest on cash, additional interest paid on debt, and the effects of issuing additional shares. Acquisition effects - such as amortization of intangibles - can also make an acquisition dilutive."
        },
        {
         "Question Number": 172,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Is there a rule of thumb for calculating whether an acquisition will be accretive or dilutive?",
         "Answer": "If the deal involves just cash and debt, you can sum up the interest expense for debt and the foregone interest on cash, then compare it against the seller's Pre-Tax Income. And if it's an all-stock deal you can use a shortcut to assess whether it is accretive (see question #5). But if the deal involves cash, stock, and debt, there's no quick rule-of-thumb you can use unless you're lightning fast with mental math."
        },
        {
         "Question Number": 174,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What is the rule of thumb for assessing whether an M&A deal will be accretive or dilutive?",
         "Answer": "In an all-stock deal, if the buyer has a higher P\/E than the seller, it will be accretive; if the buyer has a lower P\/E, it will be dilutive. On an intuitive level if you're paying more for earnings than what the market values your own earnings at, you can guess that it will be dilutive; and likewise, if you're paying less for earnings than what the market values your own earnings at, you can guess that it would be accretive."
        },
        {
         "Question Number": 175,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What are the complete effects of an acquisition?",
         "Answer": "1. Foregone Interest on Cash - The buyer loses the Interest it would have otherwise earned if it uses cash for the acquisition. 2. Additional Interest on Debt - The buyer pays additional Interest Expense if it uses debt. 3. Additional Shares Outstanding - If the buyer pays with stock, it must issue additional shares. 4. Combined Financial Statements - After the acquisition, the seller's financials are added to the buyer's. 5. Creation of Goodwill & Other Intangibles - These Balance Sheet items that represent a \"premium\" paid to a company's \"fair value\" also get created. Note: There's actually more than this (see the advanced questions), but this is usually sufficient to mention in interviews."
        },
        {
         "Question Number": 176,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "If a company were capable of paying 100% in cash for another company, why would it choose NOT to do so?",
         "Answer": "It might be saving its cash for something else or it might be concerned about running low if business takes a turn for the worst; its stock may also be trading at an all-time high and it might be eager to use that instead (in finance terms this would be \"more expensive\" but a lot of executives value having a safety cushion in the form of a large cash balance)."
        },
        {
         "Question Number": 177,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Why would a strategic acquirer typically be willing to pay more for a company than a private equity firm would?",
         "Answer": "Because the strategic acquirer can realize revenue and cost synergies that the private equity firm cannot unless it combines the company with a complementary portfolio company. Those synergies boost the effective valuation for the target company."
        },
        {
         "Question Number": 178,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Why do Goodwill & Other Intangibles get created in an acquisition?",
         "Answer": "These represent the value over the \"fair market value\" of the seller that the buyer has paid. You calculate the number by subtracting the book value of a company from its equity purchase price. More specifically, Goodwill and Other Intangibles represent things like the value of customer relationships, brand names and intellectual property - valuable, but not true financial Assets that show up on the Balance Sheet."
        },
        {
         "Question Number": 179,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What is the difference between Goodwill and Other Intangible Assets?",
         "Answer": "Goodwill typically stays the same over many years and is not amortized. It changes only if there's goodwill impairment (or another acquisition). Other Intangible Assets, by contrast, are amortized over several years and affect the Income Statement by hitting the Pre-Tax Income line. There's also a difference in terms of what they each represent, but bankers rarely go into that level of detail - accountants and valuation specialists worry about assigning each one to specific items."
        },
        {
         "Question Number": 180,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Is there anything else \"intangible\" besides Goodwill & Other Intangibles that could also impact the combined company?",
         "Answer": "Yes. You could also have a Purchased In-Process R&D Write-off and a Deferred Revenue Write-off. The first refers to any Research & Development projects that were purchased in the acquisition but which have not been completed yet. The logic is that unfinished R&D projects require significant resources to complete, and as such, the \"expense\" must be recognized as part of the acquisition. The second refers to cases where the seller has collected cash for a service but not yet recorded it as revenue, and the buyer must write-down the value of the Deferred Revenue to avoid \"double counting\" revenue."
        },
        {
         "Question Number": 181,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What are synergies, and can you provide a few examples?",
         "Answer": "Synergies refer to cases where 2 + 2 = 5 (or 6, or 7...) in an acquisition. Basically, the buyer gets more value than out of an acquisition than what the financials would predict. There are 2 types: revenue synergies and cost (or expense) synergies. • Revenue Synergies: The combined company can cross-sell products to new customers or up-sell new products to existing customers. It might also be able to expand into new geographies as a result of the deal. • Cost Synergies: The combined company can consolidate buildings and administrative staff and can lay off redundant employees. It might also be able to shut down redundant stores or locations."
        },
        {
         "Question Number": 182,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "How are synergies used in merger models?",
         "Answer": "Revenue Synergies: Normally you add these to the Revenue figure for the combined company and then assume a certain margin on the Revenue - this additional Revenue then flows through the rest of the combined Income Statement. Cost Synergies: Normally you reduce the combined COGS or Operating Expenses by this amount, which in turn boosts the combined Pre-Tax Income and thus Net Income, raising the EPS and making the deal more accretive."
        },
        {
         "Question Number": 183,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Are revenue or cost synergies more important?",
         "Answer": "No one in M&A takes revenue synergies seriously because they're so hard to predict. Cost synergies are taken a bit more seriously because it's more straightforward to see how buildings and locations might be consolidated and how many redundant employees might be eliminated. That said, the chances of any synergies actually being realized are almost 0 so few take them seriously at all."
        },
        {
         "Question Number": 184,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "All else being equal, which method would a company prefer to use when acquiring another company - cash, stock, or debt?",
         "Answer": "Assuming the buyer had unlimited resources, it would always prefer to use cash when buying another company. Why? • Cash is \"cheaper\" than debt because interest rates on cash are usually under 5% whereas debt interest rates are almost always higher than that. Thus, foregone interest on cash is almost always less than additional interest paid on debt for the same amount of cash\/debt. • Cash is also less \"risky\" than debt because there's no chance the buyer might fail to raise sufficient funds from investors. • It's hard to compare the \"cost\" directly to stock, but in general stock is the most \"expensive\" way to finance a transaction - remember how the Cost of Equity is almost always higher than the Cost of Debt? That same principle applies here. • Cash is also less risky than stock because the buyer's share price could change dramatically once the acquisition is announced."
        },
        {
         "Question Number": 185,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "How much debt could a company issue in a merger or acquisition?",
         "Answer": "Generally you would look at Comparable Companies\/ Precedent Transactions to determine this. You would use the combined company's LTM (Last Twelve Months) EBITDA figure, find the median Debt\/EBITDA ratio of whatever companies you're looking at, and apply that to your own EBITDA figure to get a rough idea of how much debt you could raise. You would also look at \"Debt Comps\" for companies in the same industry and see what types of debt and how many tranches they have used."
        },
        {
         "Question Number": 186,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "How do you determine the Purchase Price for the target company in an acquisition?",
         "Answer": "You use the same Valuation methodologies we already discussed. If the seller is a public company, you would pay more attention to the premium paid over the current share price to make sure it's \"sufficient\" (generally in the 15-30% range) to win shareholder approval. For private sellers, more weight is placed on the traditional methodologies."
        },
        {
         "Question Number": 187,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Let's say a company overpays for another company - what typically happens afterwards and can you give any recent examples?",
         "Answer": "There would be an incredibly high amount of Goodwill & Other Intangibles created if the price is far above the fair market value of the company. Depending on how the acquisition goes, there might be a large goodwill impairment charge later on if the company decides it overpaid. A recent example is the eBay \/ Skype deal, in which eBay paid a huge premium and extremely high multiple for Skype. It created excess Goodwill & Other Intangibles, and eBay later ended up writing down much of the value and taking a large quarterly loss as a result."
        },
        {
         "Question Number": 188,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "A buyer pays $100 million for the seller in an all-stock deal, but a day later the market decides it's only worth $50 million. What happens?",
         "Answer": "The buyer's share price would fall by whatever per-share dollar amount corresponds to the $50 million loss in value. Note that it would not necessarily be cut in half. Depending on how the deal was structured, the seller would effectively only be receiving half of what it had originally negotiated. This illustrates one of the major risks of all-stock deals: sudden changes in share price could dramatically impact valuation."
        },
        {
         "Question Number": 189,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Why do most mergers and acquisitions fail?",
         "Answer": "Like so many things, M&A is \"easier said than done.\" In practice it's very difficult to acquire and integrate a different company, actually realize synergies and also turn the acquired company into a profitable division. Many deals are also done for the wrong reasons, such as CEO ego or pressure from shareholders. Any deal done without both parties' best interests in mind is likely to fail."
        },
        {
         "Question Number": 190,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What role does a merger model play in deal negotiations?",
         "Answer": "The model is used as a sanity check and is used to test various assumptions. A company would never decide to do a deal based on the output of a model. It might say, \"Ok, the model tells us this deal could work and be moderately accretive - it's worth exploring more.\" It would never say, \"Aha! This model predicts 21% accretion - we should definitely acquire them now!\" Emotions, ego and personalities play a far bigger role in M&A (and any type of negotiation) than numbers do."
        },
        {
         "Question Number": 191,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What types of sensitivities would you look at in a merger model? What variables would you look at?",
         "Answer": "The most common variables to look at are Purchase Price, % Stock\/Cash\/Debt, Revenue Synergies, and Expense Synergies. Sometimes you also look at different operating sensitivities, like Revenue Growth or EBITDA Margin, but it's more common to build these into your model as different scenarios instead. You might look at sensitivity tables showing the EPS accretion\/dilution at different ranges for the Purchase Price vs. Cost Synergies, Purchase Price vs. Revenue Synergies, or Purchase Price vs. % Cash (and so on)."
        },
        {
         "Question Number": 192,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "What's the difference between Purchase Accounting and Pooling Accounting in an M&A deal?",
         "Answer": "In purchase accounting the seller's shareholders' equity number is wiped out and the premium paid over that value is recorded as Goodwill on the combined balance sheet post-acquisition. In pooling accounting, you simply combine the 2 shareholders' equity numbers rather than worrying about Goodwill and the related items that get created. There are specific requirements for using pooling accounting, so in 99% of M&A deals you will use purchase accounting."
        },
        {
         "Question Number": 193,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Walk me through a concrete example of how to calculate revenue synergies.",
         "Answer": "\"Let's say that Microsoft is going to acquire Yahoo. Yahoo makes money from search advertising online, and they make a certain amount of revenue per search (RPS). Let's say this RPS is $0.10 right now. If Microsoft acquired it, we might assume that they could boost this RPS by $0.01 or $0.02 because of their superior monetization. So to calculate the additional revenue from this synergy, we would multiply this $0.01 or $0.02 by Yahoo's total # of searches, get the total additional revenue, and then select a margin on it to determine how much flows through to the combined company's Operating Income.\""
        },
        {
         "Question Number": 194,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Walk me through an example of how to calculate expense synergies.",
         "Answer": "\"Let's say that Microsoft still wants to acquire Yahoo!. Microsoft has 5,000 SG&A-related employees, whereas Yahoo has around 1,000. Microsoft calculates that post-transaction, it will only need about 200 of Yahoo's SG&A employees, and its existing employees can take over the rest of the work. To calculate the Operating Expenses the combined company would save, we would multiply these 800 employees Microsoft is going to fire post-transaction by their average salary.\""
        },
        {
         "Question Number": 195,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "How do you take into account NOLs in an M&A deal?",
         "Answer": "You apply Section 382 to determine how much of the seller's NOLs are usable each year. Allowable NOLs = Equity Purchase Price * Highest of Past 3 Months' Adjusted Long Term Rates So if our equity purchase price were $1 billion and the highest adjusted long-term rate were 5%, then we could use $1 billion * 5% = $50 million of NOLs each year. If the seller had $250 million in NOLs, then the combined company could use $50 million of them each year for 5 years to offset its taxable income. You can look at long-term rates right here: http:\/\/pmstax.com\/afr\/exemptAFR.shtml"
        },
        {
         "Question Number": 196,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Why do deferred tax liabilities (DTLs) and deferred tax assets (DTAs) get created in M&A deals?",
         "Answer": "These get created when you write up assets - both tangible and intangible - and when you write down assets in a transaction. An asset write-up creates a deferred tax liability, and an asset write-down creates a deferred tax asset. You write down and write up assets because their book value - what's on the balance sheet - often differs substantially from their \"fair market value.\" An asset write-up creates a deferred tax liability because you'll have a higher depreciation expense on the new asset, which means you save on taxes in the short-term - but eventually you'll have to pay them back, hence the liability. The opposite applies for an asset write-down and a deferred tax asset."
        },
        {
         "Question Number": 197,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "How do DTLs and DTAs affect the Balance Sheet Adjustment in an M&A deal?",
         "Answer": "You take them into account with everything else when calculating the amount of Goodwill & Other Intangibles to create on your pro-forma balance sheet. The formulas are as follows: Deferred Tax Asset = Asset Write-Down * Tax Rate Deferred Tax Liability = Asset Write-Up * Tax Rate So let's say you were buying a company for $1 billion with half-cash and half-debt, and you had a $100 million asset write-up and a tax rate of 40%. In addition, the seller has total assets of $200 million, total liabilities of $150 million, and shareholders' equity of $50 million. Here's what would happen to the combined company's balance sheet (ignoring transaction\/financing fees): • First, you simply add the seller's Assets and Liabilities (but NOT Shareholders' Equity - it is wiped out) to the buyer's to get your \"initial\" balance sheet. Assets are up by $200 million and Liabilities are down by $150 million. • Then, Cash on the Assets side goes down by $500 million. • Debt on the Liabilities & Equity side goes up by $500 million. • You get a new Deferred Tax Liability of $40 million ($100 million * 40%) on the Liabilities & Equity side. • Assets are down by $300 million total and Liabilities & Shareholders' Equity are up by $690 million ($500 + $40 + $150). • So you need Goodwill & Intangibles of $990 million on the Assets side to make both sides balance."
        },
        {
         "Question Number": 198,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Could you get DTLs or DTAs in an asset purchase?",
         "Answer": "No, because in an asset purchase the book basis of assets always matches the tax basis. They get created in a stock purchase because the book values of assets are written up or written down, but the tax values are not."
        },
        {
         "Question Number": 199,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "How do you account for DTLs in forward projections in a merger model?",
         "Answer": "You create a book vs. cash tax schedule and figure out what the company owes in taxes based on the Pretax Income on its books, and then you determine what it actually pays in cash taxes based on its NOLs and newly created amortization and depreciation expenses (from any asset write-ups). Anytime the \"cash\" tax expense exceeds the \"book\" tax expense you record this as an decrease to the Deferred Tax Liability on the Balance Sheet; if the \"book\" expense is higher, then you record that as an increase to the DTL."
        },
        {
         "Question Number": 200,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Explain the complete formula for how to calculate Goodwill in an M&A deal.",
         "Answer": "Goodwill = Equity Purchase Price - Seller Book Value + Seller's Existing Goodwill - Asset Write-Ups - Seller's Existing Deferred Tax Liability + Write-Down of Seller's Existing Deferred Tax Asset + Newly Created Deferred Tax Liability A couple notes here: • Seller Book Value is just the Shareholders' Equity number. • You add the Seller's Existing Goodwill because it gets written down to $0 in an M&A deal. • You subtract the Asset Write-Ups because these are additions to the Assets side of the Balance Sheet - Goodwill is also an asset, so effectively you need less Goodwill to \"plug the hole.\" • Normally you assume 100% of the Seller's existing DTL is written down. • The seller's existing DTA may or may not be written down completely (see the next question)."
        },
        {
         "Question Number": 201,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Explain why we would write down the seller's existing Deferred Tax Asset in an M&A deal.",
         "Answer": "You write it down to reflect the fact that Deferred Tax Assets include NOLs, and that you might use these NOLs post-transaction to offset the combined entity's taxable income. In an asset or 338(h)(10) purchase you assume that the entire NOL balance goes to $0 in the transaction, and then you write down the existing Deferred Tax Asset by this NOL write-down. In a stock purchase the formula is: DTA Write-Down = Buyer Tax Rate MAX(0, NOL Balance - Allowed Annual NOL Usage Expiration Period in Years) This formula is saying, \"If we're going to use up all these NOLs post transaction, let's not write anything down. Otherwise, let's write down the portion that we cannot actually use post-transaction, i.e. whatever our existing NOL balance is minus the amount we can use per year times the number of years.\""
        },
        {
         "Question Number": 202,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "What's a Section 338(h)(10) election and why might a company want to use it in an M&A deal?",
         "Answer": "A Section 338(h)(10) election blends the benefits of a stock purchase and an asset purchase: • Legally it is a stock purchase, but accounting-wise it's treated like an asset purchase. • The seller is still subject to double-taxation - on its assets that have appreciated and on the proceeds from the sale. • But the buyer receives a step-up tax basis on the new assets it acquires, and it can depreciate\/amortize them so it saves on taxes. Even though the seller still gets taxed twice, buyers will often pay more in a 338(h)(10) deal because of the tax-savings potential. It's particularly helpful for: • Sellers with high NOL balances (more tax-savings for the buyer because this NOL balance will be written down completely - and so more of the excess purchase price can be allocated to asset write-ups). • If the company has been an S-corporation for over 10 years - in this case it doesn't have to pay a tax on the appreciation of its assets. The requirements to use 338(h)(10) are complex and bankers don't deal with this - that is the role of lawyers and tax accountants."
        },
        {
         "Question Number": 203,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "What is an exchange ratio and when would companies use it in an M&A deal?",
         "Answer": "An exchange ratio is an alternate way of structuring a 100% stock M&A deal, or any M&A deal with a portion of stock involved. Let's say you were going to buy a company for $100 million in an all-stock deal. Normally you would determine how much stock to issue by dividing the $100 million by the buyer's stock price, and using that to get the new share count. With an exchange ratio, by contrast, you would tie the number of new shares to the buyer's own shares - so the seller might receive 1.5 shares of the buyer's shares for each of its shares, rather than shares worth a specific dollar amount. Buyers might prefer to do this if they believe their stock price is going to decline posttransaction - sellers, on the other hand, would prefer a fixed dollar amount in stock unless they believe the buyer's share price will rise after the transaction."
        },
        {
         "Question Number": 204,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Walk me through the most important terms of a Purchase Agreement in an M&A deal.",
         "Answer": "There are dozens, but here are the most important ones: • Purchase Price: Stated as a per-share amount for public companies. • Form of Consideration: Cash, Stock, Debt... • Transaction Structure: Stock, Asset, or 338(h)(10) • Treatment of Options: Assumed by the buyer? Cashed out? Ignored? • Employee Retention: Do employees have to sign non-solicit or non-compete agreements? What about management? • Reps & Warranties: What must the buyer and seller claim is true about their respective businesses? • No-Shop \/ Go-Shop: Can the seller \"shop\" this offer around and try to get a better deal, or must it stay exclusive to this buyer?"
        },
        {
         "Question Number": 205,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "What's an Earnout and why would a buyer offer it to a seller in an M&A deal?",
         "Answer": "An Earnout is a form of \"deferred payment\" in an M&A deal - it's most common with private companies and start-ups, and is highly unusual with public sellers. It is usually contingent on financial performance or other goals - for example, the buyer might say, \"We'll give you an additional $10 million in 3 years if you can hit $100 million in revenue by then.\" Buyers use it to incentivize sellers to continue to perform well and to discourage management teams from taking the money and running off to an island in the South Pacific once the deal is done."
        },
        {
         "Question Number": 206,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "How would an accretion \/ dilution model be different for a private seller?",
         "Answer": "The mechanics are the same, but the transaction structure is more likely to be an asset purchase or 338(h)(10) election; private sellers also don't have Earnings Per Share so you would only project down to Net Income on the seller's Income Statement. Note that accretion \/ dilution makes no sense if you have a private buyer because private companies do not have Earnings Per Share."
        },
        {
         "Question Number": 207,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "How would I calculate \"break-even synergies\" in an M&A deal and what does the number mean?",
         "Answer": "To do this, you would set the EPS accretion \/ dilution to $0.00 and then back-solve in Excel to get the required synergies to make the deal neutral to EPS. It's important because you want an idea of whether or not a deal \"works\" mathematically, and a high number for the break-even synergies tells you that you're going to need a lot of cost savings or revenue synergies to make it work."
        },
        {
         "Question Number": 208,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Normally in an accretion \/ dilution model you care most about combining both companies' Income Statements. But let's say I want to combine all 3 financial statements - how would I do this?",
         "Answer": "You combine the Income Statements like you normally would (see the previous question on this), and then you do the following: 1. Combine the buyer's and seller's balance sheets (except for the seller's Shareholders' Equity number). 2. Make the necessary Pro-Forma Adjustments (cash, debt, goodwill\/intangibles, etc.). 3. Project the combined Balance Sheet using standard assumptions for each item (see the Accounting section). 4. Then project the Cash Flow Statement and link everything together as you normally would with any other 3-statement model."
        },
        {
         "Question Number": 209,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "How do you handle options, convertible debt, and other dilutive securities in a merger model?",
         "Answer": "The exact treatment depends on the terms of the Purchase Agreement - the buyer might assume them or it might allow the seller to \"cash them out\" assuming that the per-share purchase price is above the exercise prices of these dilutive securities. If you assume they're exercised, then you calculate dilution to the equity purchase price in the same way you normally would - Treasury Stock Method for options, and assume that convertibles convert into normal shares using the conversion price."
        },
        {
         "Question Number": 210,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "What are the main 3 transaction structures you could use to acquire another company?",
         "Answer": "Stock Purchase, Asset Purchase, and 338(h)(10) Election. The basic differences: Stock Purchase: • Buyer acquires all asset and liabilities of the seller as well as off-balance sheet items. • The seller is taxed at the capital gains tax rate. • The buyer receives no step-up tax basis for the newly acquired assets, and it can't depreciate\/amortize them for tax purposes. • A Deferred Tax Liability gets created as a result of the above. • Most common for public companies and larger private companies. Asset Purchase: • Buyer acquires only certain assets and assumes only certain liabilities of the seller and gets nothing else. • Seller is taxed on the amount its assets have appreciated (what the buyer is paying for each one minus its book value) and also pays a capital gains tax on the proceeds. • The buyer receives a step-up tax basis for the newly acquired assets, and it can depreciate\/amortize them for tax purposes. • No Deferred Tax Liability is created as a result of the above. • Most common for private companies, divestitures, and distressed public companies. Section 338(h)(10) Election: • Buyer acquires all asset and liabilities of the seller as well as off-balance sheet items. • Seller is taxed on the amount its assets have appreciated (what the buyer is paying for each one minus its book value) and also pays a capital gains tax on the proceeds. • The buyer receives a step-up tax basis for the newly acquired assets, and it can depreciate\/amortize them for tax purposes. • No Deferred Tax Liability is created as a result of the above. • Most common for private companies, divestitures, and distressed public companies. • To compensate for the buyer's favorable tax treatment, the buyer usually agrees to pay more than it would in an Asset Purchase."
        },
        {
         "Question Number": 211,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Would a seller prefer a stock purchase or an asset purchase? What about the buyer?",
         "Answer": "A seller almost always prefers a stock purchase to avoid double taxation and to get rid of all its liabilities. The buyer almost always prefers an asset deal so it can be more careful about what it acquires and to get the tax benefit from being able to deduct depreciation and amortization of asset write-ups for tax purposes."
        },
        {
         "Question Number": 212,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Explain what a contribution analysis is and why we might look at it in a merger model.",
         "Answer": "A contribution analysis compares how much revenue, EBITDA, Pre-Tax Income, cash, and possibly other items the buyer and seller are \"contributing\" to estimate what the ownership of the combined company should be. For example, let's say that the buyer is set to own 50% of the new company and the seller is set to own 50%. But the buyer has $100 million of revenue and the seller has $50 million of revenue - a contribution analysis would tell us that the buyer \"should\" own 66% instead because it's contributing 2\/3 of the combined revenue. It's most common to look at this with merger of equals scenarios, and less common when the buyer is significantly larger than the seller."
        },
        {
         "Question Number": 213,
         "Category": "Merger Model (M&A)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "How do you account for transaction costs, financing fees, and miscellaneous expenses in a merger model?",
         "Answer": "In the \"old days\" you used to capitalize these expenses and then amortize them; with the new accounting rules, you're supposed to expense transaction and miscellaneous fees upfront, but capitalize the financing fees and amortize them over the life of the debt. Expensed transaction fees come out of Retained Earnings when you adjust the Balance Sheet, while capitalized financing fees appear as a new Asset on the Balance Sheet and are amortized each year according to the tenor of the debt."
        },
        {
         "Question Number": 214,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Walk me through a basic LBO model.",
         "Answer": "\"In an LBO Model, Step 1 is making assumptions about the Purchase Price, Debt\/Equity ratio, Interest Rate on Debt and other variables; you might also assume something about the company's operations, such as Revenue Growth or Margins, depending on how much information you have. Step 2 is to create a Sources & Uses section, which shows how you finance the transaction and what you use the capital for; this also tells you how much Investor Equity is required. Step 3 is to adjust the company's Balance Sheet for the new Debt and Equity figures, and also add in Goodwill & Other Intangibles on the Assets side to make everything balance. In Step 4, you project out the company's Income Statement, Balance Sheet and Cash Flow Statement, and determine how much debt is paid off each year, based on the available Cash Flow and the required Interest Payments. Finally, in Step 5, you make assumptions about the exit after several years, usually assuming an EBITDA Exit Multiple, and calculate the return based on how much equity is returned to the firm.\""
        },
        {
         "Question Number": 215,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Why would you use leverage when buying a company?",
         "Answer": "To boost your return. Remember, any debt you use in an LBO is not \"your money\" - so if you're paying $5 billion for a company, it's easier to earn a high return on $2 billion of your own money and $3 billion borrowed from elsewhere vs. $3 billion of your own money and $2 billion of borrowed money. A secondary benefit is that the firm also has more capital available to purchase other companies because they've used leverage."
        },
        {
         "Question Number": 217,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "How do you pick purchase multiples and exit multiples in an LBO model?",
         "Answer": "The same way you do it anywhere else: you look at what comparable companies are trading at, and what multiples similar LBO transactions have had. As always, you also show a range of purchase and exit multiples using sensitivity tables. Sometimes you set purchase and exit multiples based on a specific IRR target that you're trying to achieve - but this is just for valuation purposes if you're using an LBO model to value the company."
        },
        {
         "Question Number": 218,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What is an \"ideal\" candidate for an LBO?",
         "Answer": "\"Ideal\" candidates have stable and predictable cash flows, low-risk businesses, not much need for ongoing investments such as Capital Expenditures, as well as an opportunity for expense reductions to boost their margins. A strong management team also helps, as does a base of assets to use as collateral for debt. The most important part is stable cash flow."
        },
        {
         "Question Number": 219,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "How do you use an LBO model to value a company, and why do we sometimes say that it sets the \"floor valuation\" for the company?",
         "Answer": "You use it to value a company by setting a targeted IRR (for example, 25%) and then back-solving in Excel to determine what purchase price the PE firm could pay to achieve that IRR. This is sometimes called a \"floor valuation\" because PE firms almost always pay less for a company than strategic acquirers would."
        },
        {
         "Question Number": 220,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Give an example of a \"real-life\" LBO.",
         "Answer": "The most common example is taking out a mortgage when you buy a house. Here's how the analogy works: • Down Payment: Investor Equity in an LBO • Mortgage: Debt in an LBO • Mortgage Interest Payments: Debt Interest in an LBO • Mortgage Repayments: Debt Principal Repayments in an LBO • Selling the House: Selling the Company \/ Taking It Public in an LBO"
        },
        {
         "Question Number": 221,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Can you explain how the Balance Sheet is adjusted in an LBO model?",
         "Answer": "First, the Liabilities & Equities side is adjusted - the new debt is added on, and the Shareholders' Equity is \"wiped out\" and replaced by however much equity the private equity firm is contributing. On the Assets side, Cash is adjusted for any cash used to finance the transaction, and then Goodwill & Other Intangibles are used as a \"plug\" to make the Balance Sheet balance. Depending on the transaction, there could be other effects as well - such as capitalized financing fees added to the Assets side."
        },
        {
         "Question Number": 222,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Why are Goodwill & Other Intangibles created in an LBO?",
         "Answer": "Remember, these both represent the premium paid to the \"fair market value\" of the company. In an LBO, they act as a \"plug\" and ensure that the changes to the Liabilities & Equity side are balanced by changes to the Assets side."
        },
        {
         "Question Number": 223,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "We saw that a strategic acquirer will usually prefer to pay for another company in cash - if that's the case, why would a PE firm want to use debt in an LBO?",
         "Answer": "It's a different scenario because: 1. The PE firm does not intend to hold the company for the long-term - it usually sells it after a few years, so it is less concerned with the \"expense\" of cash vs. debt and more concerned about using leverage to boost its returns by reducing the amount of capital it has to contribute upfront. 2. In an LBO, the debt is \"owned\" by the company, so they assume much of the risk. Whereas in a strategic acquisition, the buyer \"owns\" the debt so it is more risky for them."
        },
        {
         "Question Number": 224,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Do you need to project all 3 statements in an LBO model? Are there any \"shortcuts?\"",
         "Answer": "Yes, there are shortcuts and you don't necessarily need to project all 3 statements. For example, you do not need to create a full Balance Sheet - bankers sometimes skip this if they are in a rush. You do need some form of Income Statement, something to track how the Debt balances change and some type of Cash Flow Statement to show how much cash is available to repay debt. But a full-blown Balance Sheet is not strictly required, because you can just make assumptions on the Net Change in Working Capital rather than looking at each item individually."
        },
        {
         "Question Number": 225,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "How would you determine how much debt can be raised in an LBO and how many tranches there would be?",
         "Answer": "Usually you would look at Comparable LBOs and see the terms of the debt and how many tranches each of them used. You would look at companies in a similar size range and industry and use those criteria to determine the debt your company can raise."
        },
        {
         "Question Number": 226,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Let's say we're analyzing how much debt a company can take on, and what the terms of the debt should be. What are reasonable leverage and coverage ratios?",
         "Answer": "This is completely dependent on the company, the industry, and the leverage and coverage ratios for comparable LBO transactions. To figure out the numbers, you would look at \"debt comps\" showing the types, tranches, and terms of debt that similarly sized companies in the industry have used recently. There are some general rules: for example, you would never lever a company at 50x EBITDA, and even during the bubble leverage rarely exceeded 5-10x EBITDA."
        },
        {
         "Question Number": 227,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What is the difference between bank debt and high-yield debt?",
         "Answer": "This is a simplification, but broadly speaking there are 2 \"types\" of debt: \"bank debt\" and \"high-yield debt.\" There are many differences, but here are a few of the most important ones: • High-yield debt tends to have higher interest rates than bank debt (hence the name \"high-yield\"). • High-yield debt interest rates are usually fixed, whereas bank debt interest rates are \"floating\" - they change based on LIBOR or the Fed interest rate. • High-yield debt has incurrence covenants while bank debt has maintenance covenants. The main difference is that incurrence covenants prevent you from doing something (such as selling an asset, buying a factory, etc.) while maintenance covenants require you to maintain a minimum financial performance (for example, the Debt\/EBITDA ratio must be below 5x at all times). • Bank debt is usually amortized - the principal must be paid off over time - whereas with high-yield debt, the entire principal is due at the end (bullet maturity). Usually in a sizable Leveraged Buyout, the PE firm uses both types of debt. Again, there are many different types of debt - this is a simplification, but it's enough for entry-level interviews."
        },
        {
         "Question Number": 228,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Why might you use bank debt rather than high-yield debt in an LBO?",
         "Answer": "If the PE firm or the company is concerned about meeting interest payments and wants a lower-cost option, they might use bank debt; they might also use bank debt if they are planning on major expansion or Capital Expenditures and don't want to be restricted by incurrence covenants."
        },
        {
         "Question Number": 229,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Why would a PE firm prefer high-yield debt instead?",
         "Answer": "If the PE firm intends to refinance the company at some point or they don't believe their returns are too sensitive to interest payments, they might use high-yield debt. They might also use the high-yield option if they don't have plans for major expansion or selling off the company's assets."
        },
        {
         "Question Number": 230,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Why would a private equity firm buy a company in a \"risky\" industry, such as technology?",
         "Answer": "Although technology is more \"risky\" than other markets, remember that there are mature, cash flow-stable companies in almost every industry. There are some PE firms that specialize in very specific goals, such as: • Industry consolidation - buying competitors in a similar market and combining them to increase efficiency and win more customers. • Turnarounds - taking struggling companies and making them function properly again. • Divestitures - selling off divisions of a company or taking a division and turning it into a strong stand-alone entity. So even if a company isn't doing well or seems risky, the firm might buy it if it falls into one of these categories."
        },
        {
         "Question Number": 231,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "How could a private equity firm boost its return in an LBO?",
         "Answer": "1. Lower the Purchase Price in the model. 2. Raise the Exit Multiple \/ Exit Price. 3. Increase the Leverage (debt) used. 4. Increase the company's growth rate (organically or via acquisitions). 5. Increase margins by reducing expenses (cutting employees, consolidating buildings, etc.). Note that these are all \"theoretical\" and refer to the model rather than reality - inpractice it's hard to actually implement these."
        },
        {
         "Question Number": 232,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What is meant by the \"tax shield\" in an LBO?",
         "Answer": "This means that the interest a firm pays on debt is tax-deductible - so they save money on taxes and therefore increase their cash flow as a result of having debt from the LBO. Note, however, that their cash flow is still lower than it would be without the debt - saving on taxes helps, but the added interest expenses still reduces Net Income over what it would be for a debt-free company."
        },
        {
         "Question Number": 233,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "What is a dividend recapitalization (\"dividend recap\")?",
         "Answer": "In a dividend recap, the company takes on new debt solely to pay a special dividend out to the PE firm that bought it. It would be like if you made your friend take out a personal loan just so he\/she could pay you a lump sum of cash with the loan proceeds. As you might guess, dividend recaps have developed a bad reputation, though they're still commonly used."
        },
        {
         "Question Number": 234,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "Why would a PE firm choose to do a dividend recap of one of its portfolio companies?",
         "Answer": "Primarily to boost returns. Remember, all else being equal, more leverage means a higher return to the firm. With a dividend recap, the PE firm is \"recovering\" some of its equity investment in the company - and as we saw earlier, the lower the equity investment, the better, since it's easier to earn a higher return on a smaller amount of capital."
        },
        {
         "Question Number": 235,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Basic",
         "Question": "How would a dividend recap impact the 3 financial statements in an LBO?",
         "Answer": "No changes to the Income Statement. On the Balance Sheet, Debt would go up and Shareholders' Equity would go down and they would cancel each other out so that everything remained in balance. On the Cash Flow Statement, there would be no changes to Cash Flow from Operations or Investing, but under Financing the additional Debt raised would cancel out the Cash paid out to the investors, so Net Change in Cash would not change."
        },
        {
         "Question Number": 236,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Tell me about all the different kinds of debt you could use in an LBO and the differences between everything.",
         "Answer": "Here's a handy chart to explain all of this. Note that this chart does not cover every single feature or every single type of debt in the universe - just the most important ones, and what you're likely to be asked about in finance interviews: [SEE CHART ON BIWS GUIDES] \"Tenor\" is just the fancy word for \"How many years will this loan be outstanding?\" Each type of debt is arranged in order of rising interest rates - so a revolver has the lowest interest rate, Term Loan A is slightly higher, B is slightly higher, Senior Notes are higher than Term Loan B, and so on. \"Seniority\" refers to the order of claims on a company's assets in a bankruptcy - the Senior Secured holders are first in line, followed by Senior Unsecured, Senior Subordinated, and then Equity Investors. \"Floating\" or \"Fixed\" Interest Rates: A \"floating\" interest rate is tied to LIBOR. For example, L + 100 means that the interest rate of the loan is whatever LIBOR is at currently, plus 100 basis points (1.0%). A fixed interest rate, on the other hand, would be 11%. It doesn't \"float\" with LIBOR or any other rate. Amortization: \"straight line\" means the company pays off the principal in equal installments each year, while \"bullet\" means that the entire principal is due at the end of the loan's lifecycle. \"Minimal\" just means a low percentage of the principal each year, usually in the 1-5% range. Call Protection: Is the company prohibited from \"calling back\" - paying off or redeeming - the security for a certain period? This is beneficial for investors because they are guaranteed a certain number of interest payments."
        },
        {
         "Question Number": 237,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "How would an asset write-up or write-down affect an LBO model? \/ Walk me through how you adjust the Balance Sheet in an LBO model.",
         "Answer": "All of this is very similar to what you would see in a merger model - you calculate Goodwill, Other Intangibles, and the rest of the write-ups in the same way, and then the Balance Sheet adjustments (e.g. subtracting cash, adding in capitalized financing fees, writing up assets, wiping out goodwill, adjusting the deferred tax assets \/ liabilities, adding in new debt, etc.) are almost the same. The key differences: • In an LBO model you assume that the existing Shareholders' Equity is wiped out and replaced by the equity the private equity firm contributes to buy the company; you may also add in Preferred Stock, Management Rollover, or Rollover from Option Holders to this number as well depending on what you're assuming for transaction financing. • In an LBO model you'll usually be adding a lot more tranches of debt vs. what you would see in a merger model. • In an LBO model you're not combining two companies' Balance Sheets."
        },
        {
         "Question Number": 238,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Normally we care about the IRR for the equity investors in an LBO - the PE firm that buys the company - but how do we calculate the IRR for the debt investors?",
         "Answer": "For the debt investors, you need to calculate the interest and principal payments they receive from the company each year. Then you simply use the IRR function in Excel and start with the negative amount of the original debt for \"Year 0,\" assume that the interest and principal payments each year are your \"cash flows\" and then assume that the remaining debt balance in the final year is your \"exit value.\" Most of the time, returns for debt investors will be lower than returns for the equity investors - but if the deal goes poorly or the PE firm can't sell the company for a good price, the reverse could easily be true."
        },
        {
         "Question Number": 239,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Why might a private equity firm allot some of a company's new equity in an LBO to a management option pool, and how would this affect the model?",
         "Answer": "This is done for the same reason you have an Earnout in an M&A deal: the PE firm wants to incentivize the management team and keep everyone on-board until they exit the investment. The difference is that there's no technical limit on how much management might receive from such an option pool: if they hit it out of the park, maybe they'll all become millionaires. In your LBO model, you would need to calculate a per-share purchase price when the PE firm exits the investment, and then calculate how much of the proceeds go to the management team based on the Treasury Stock Method. An option pool by itself would reduce the PE firm's return, but this is offset by the fact that the company should perform better with this incentive in place."
        },
        {
         "Question Number": 240,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Why would you use PIK (Payment In Kind) debt rather than other types of debt, and how does it affect the debt schedules and the other statements?",
         "Answer": "Unlike \"normal\" debt, a PIK loan does not require the borrower to make cash interest payments - instead, the interest just accrues to the loan principal, which keeps going up over time. A PIK \"toggle\" allows the company to choose whether to pay the interest in cash or have it accrue to the principal (these have disappeared since the credit crunch). PIK is more risky than other forms of debt and carries with it a higher interest rate than traditional bank debt or high yield debt. Adding it to the debt schedules is similar to adding high-yield debt with a bullet maturity - except instead of assuming cash interest payments, you assume that the interest accrues to the principal instead. You should then include this interest on the Income Statement, but you need to add back any PIK interest on the Cash Flow Statement because it's a non-cash expense."
        },
        {
         "Question Number": 241,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "What are some examples of incurrence covenants? Maintenance covenants?",
         "Answer": "Incurrence Covenants: • Company cannot take on more than $2 billion of total debt. • Proceeds from any asset sales must be earmarked to repay debt. • Company cannot make acquisitions of over $200 million in size. • Company cannot spend more than $100 million on CapEx each year. Maintenance Covenants: • Total Debt \/ EBITDA cannot exceed 3.0 x • Senior Debt \/ EBITDA cannot exceed 2.0 x • (Total Cash Payable Debt + Capitalized Leases) \/ EBITDAR cannot exceed 4.0 x • EBITDA \/ Interest Expense cannot fall below 5.0 x • EBITDA \/ Cash Interest Expense cannot fall below 3.0 x • (EBITDA - CapEx) \/ Interest Expense cannot fall below 2.0 x"
        },
        {
         "Question Number": 242,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Just like a normal M&A deal, you can structure an LBO either as a stock purchase or as an asset purchase. Can you also use Section 338(h)(10) election?",
         "Answer": "In most cases, no - because one of the requirements for Section 338(h)(10) is that the buyer must be a C corporation. Most private equity firms are organized as LLCs or Limited Partnerships, and when they acquire companies in an LBO, they create an LLC shell company that \"acquires\" the company on paper."
        },
        {
         "Question Number": 243,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Walk me through how you calculate optional repayments on debt in an LBO model.",
         "Answer": "First, note that you only look at optional repayments for Revolvers and Term Loans - high-yield debt doesn't have a prepayment option, so effectively it's always $0. First, you check how much cash flow you have available based on your Beginning Cash Balance, Minimum Cash Balance, Cash Flow Available for Debt Repayment from the Cash Flow Statement, and how much you use to make Mandatory Debt Repayments. Then, if you've used your Revolver at all you pay off the maximum amount that you can with the cash flow you have available. Next, for Term Loan A you assume that you pay off the maximum you can, taking into account that you've lost any cash flow you used to pay down the Revolver. You also need to take into account that you might have paid off some of Term Loan A's principal as part of the Mandatory Repayments. Finally, you do the same thing for Term Loan B, subtracting from the \"cash flow available for debt repayment\" what you've already used up on the Revolver and Term Loan A. And just like Term Loan A, you need to take into account any Mandatory Repayments you've made so that you don't pay off more than the entire Term Loan B balance. The formulas here get very messy and depend on how your model is set up, but this is the basic idea for optional debt repayments."
        },
        {
         "Question Number": 244,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Explain how a Revolver is used in an LBO model.",
         "Answer": "You use a Revolver when the cash required for your Mandatory Debt Repayments exceeds the cash flow you have available to repay them. The formula is: Revolver Borrowing = MAX(0, Total Mandatory Debt Repayment - Cash Flow Available to Repay Debt). The Revolver starts off \"undrawn,\" meaning that you don't actually borrow money and don't accrue a balance unless you need it - similar to how credit cards work. You add any required Revolver Borrowing to your running total for cash flow available for debt repayment before you calculate Mandatory and Optional Debt Repayments. Within the debt repayments themselves, you assume that any Revolver Borrowing from previous years is paid off first with excess cash flow before you pay off any Term Loans."
        },
        {
         "Question Number": 245,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "How would you adjust the Income Statement in an LBO model?",
         "Answer": "The most common adjustments: • Cost Savings - Often you assume the PE firm cuts costs by laying off employees, which could affect COGS, Operating Expenses, or both. • New Depreciation Expense - This comes from any PP&E write-ups in the transaction. • New Amortization Expense - This includes both the amortization from written-up intangibles and from capitalized financing fees. • Interest Expense on LBO Debt - You need to include both cash and PIK interest here. • Sponsor Management Fees - Sometimes PE firms charge a \"management fee\" to a company to account for the time and effort they spend managing it. • Common Stock Dividend - Although private companies don't pay dividends to shareholders, they could pay out a dividend recap to the PE investors. • Preferred Stock Dividend - If Preferred Stock is used as a form of financing in the transaction, you need to account for Preferred Stock Dividends on the Income Statement. Cost Savings and new Depreciation \/ Amortization hit the Operating Income line; Interest Expense and Sponsor Management Fees hit Pre-Tax Income; and you need to subtract the dividend items from your Net Income number."
        },
        {
         "Question Number": 246,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "In an LBO model, is it possible for debt investors to get a higher return than the PE firm? What does it tell us about the company we're modeling?",
         "Answer": "Yes, and it happens more commonly than you'd think. Remember, high-yield debt investors often get interest rates of 10-15% or more - which effectively guarantees an IRR in that range for them. So no matter what happens to the company or the market, that debt gets repaid and thedebt investors get the interest payments. But let's say that the median EBITDA multiples contract, or that the company fails to grow or actually shrinks - in these cases the PE firm could easily get an IRR below what the debt investors get."
        },
        {
         "Question Number": 247,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "IB Fundamentals",
         "Difficulty": "Advanced",
         "Question": "Most of the time, increased leverage means an increased IRR. Explain how increasing the leverage could reduce the IRR.",
         "Answer": "This scenario is admittedly rare, but it could happen if the increase leverage increases interest payments or debt repayments to very high levels, preventing the company from using its cash flow for other purposes. Sometimes in LBO models, increasing the leverage increases the IRR up to a certain point - but then after that the IRR starts falling as the interest payments or principal repayments become \"too big.\" For this scenario to happen you would need a \"perfect storm\" of: 1. Relative lack of cash flow \/ EBITDA growth. 2. High interest payments and principal repayments relative to cash flow. 3. Relatively high purchase premium or purchase multiple to make it more difficult to get a high IRR in the first place."
        },
        {
         "Question Number": 248,
         "Category": "Financial Institutions Group (FIG)",
         "Question": "How do commercial banks make money?",
         "Answer": "- Gets money (deposits) from customers and earns small amount of interest on it - Collects all deposits and loans them in larger quantities and at higher interest rates to organizations that need to borrow money - Makes money on the interest rate spread (difference between what they earn on loans and what they issue) - Also makes money from non-interest sources of revenue such as credit card fees, asset management fees, investment banking, and securities trading"
        },
        {
         "Question Number": 249,
         "Category": "Financial Institutions Group (FIG)",
         "Question": "How do insurance firms make money?",
         "Answer": "- Collect PREMIUMS from customers who want to be protected in case of an accident - Pay out CLAIMS to customers if \/ when accident takes place - Collect premiums upfront and use this money (the \"float\") to make INVESTMENTS and earn interest \/ capital gains - Insurance companies are typically unprofitable or marginally profitable from UNDERWRITING activities and become profitable from INVESTING activities"
        },
        {
         "Question Number": 250,
         "Category": "Financial Institutions Group (FIG)",
         "Question": "What are 5 key differences between commercial banks and normal companies?",
         "Answer": "1) Balance Sheet First - The Balance Sheet drives banks' performance, and you start the financial statements by projecting the Balance Sheet first. 2) Equity Value Only: - You cannot separate a bank's operating and financing activities as you can separate those of a traditional company. So, the concept of Enterprise Value does not apply, and you use Equity Value and Equity Value-based multiples instead. 3) Dividend Discount Models (DDM) in Place of DCFs - \"Free Cash Flow\" doesn't mean anything for banks because the Change in Working Capital and CapEx do not represent reinvestment in the business. So, you use Dividends as a proxy for FCF, Cost of Equity instead of WACC, and the Dividend Discount Model instead of the Discounted Cash Flow analysis 4) Regulation - Banks are highly regulated, and they must maintain minimum amounts of \"capital\" (Tangible Common Equity with a few modifications) at all times. These requirements constrain their growth. 5) Different Valuation Multiples - The Price \/ Book Value (P \/ BV), Price \/ Tangible Book Value (P \/ TBV), and Price \/ Earnings (P \/ E) multiples are all important because these firms are Balance Sheet-driven, and Interest is a huge part of their revenue."
        },
        {
         "Question Number": 251,
         "Category": "Financial Institutions Group (FIG)",
         "Question": "How do you value a commercial bank?",
         "Answer": "You use Public Comps, Precedent Transactions, and the Dividend Discount Model in place of the traditional Discounted Cash Flow analysis. Key differences include: 1) Public Comps and Precedent Transactions: - Screen based on Total Assets, Loans, or Deposits rather than Revenue or EBITDA; focus on metrics like ROE, ROA, Book Value, and Tangible Book Value; use multiples such as P \/ E, P \/ BV, and P \/ TBV. 2) Dividend Discount Model: - Project the bank's future Dividends based on its Regulatory Capital requirements, Total Assets, and Net Income, discount them to Present Value using the Cost of Equity, and add them up. Then, calculate the bank's Terminal Value with a P \/ BV or P \/ TBV multiple or the Gordon Growth Method, discount it to Present value, and add it to the Sum of PV of Dividends to determine the bank's Implied Equity Value. - You cannot separate a bank's operational and financial activities, so you use only Equity Value-based metrics and multiples, and you use Dividends as a proxy for Free Cash Flow since CapEx and the Change in Working Capital do not represent reinvestment for banks."
        },
        {
         "Question Number": 252,
         "Category": "Financial Institutions Group (FIG)",
         "Question": "How do you value an insurance firm?",
         "Answer": "- The same way you value a commercial bank: With P \/ E, P \/ BV, and P \/ TBV multiples for Public Comps and Precedent Transactions, and with a Dividend Discount Model (DDM) instead of the traditional DCF analysis. - You might screen for comparable companies and deals based on Total Assets or Premiums Earned. - You could also create a Net Asset Value (NAV) model where you mark everything on the firm's Balance Sheet to market value (if it has not already done so), and then you could create a P \/ NAV multiple by dividing Equity Value by Net Asset Value. - For a Life Insurance firm, you could also use the Embedded Value methodology, which takes a firm's Net Asset Value (via the method described above) and adds it to the Present Value of future cash profits from the insurance firm's current policies to determine the firm's Implied Equity value. - Embedded Value represents the Cumulative, After-Tax Cash Flows from Policies in Past Years + the Present Value of Expected After-Tax Cash Flows in Future Years. - You could then create a P \/ EV multiple and alternate metrics such as ROEV based on this concept."
        },
        {
         "Question Number": 253,
         "Category": "Financial Institutions Group (FIG)",
         "Question": "What is \"Regulatory Capital\"? Why do banks and insurance firms need it?",
         "Answer": "- Both banks and insurance firms expect to lose money from customers defaulting or customers getting in accidents. - They handle expected losses with specific items on their Balance Sheets: The Allowance for Loan Losses for banks and the Claims Reserve for insurance companies. - But there are also unexpected losses, and Regulatory Capital exists to cover those. It consists mostly of Tangible Common Equity (with adjustments and variations), which serves as a \"buffer\" against potential, unexpected losses. - If a bank has to write down a Loan, something must decrease on the L&E side to balance the change. If the bank has enough Regulatory Capital, that \"something\" will be its Equity rather than customer Deposits (i.e., the money in your checking account). - Banks must keep their Regulatory Capital \/ Some Type of Assets above certain percentages, such as 3% or 8%, at all times. - Banks must also maintain enough Liquid Assets to cover cash outflows and enough Stable Funding to meet their \"Required Stable Funding\" (Assets multiplied by various adjustment factors)."
        },
        {
         "Question Number": 254,
         "Category": "Financial Institutions Group (FIG)",
         "Question": "How are the financial statements different for a commercial bank?",
         "Answer": "• Balance Sheet: - Loans on the Assets side and Deposits on the L&E side are the key drivers; there are new items, like the Allowance for Loan Losses (a contra-asset), and more categories for Investments and Securities; items common for normal companies, such as Inventory, may not be present. • Income Statement: - Revenue is divided into Net Interest Income and Non-Interest Income; COGS do not exist; the Provision for Credit Losses is a major new expense; operating expenses are labeled Non-Interest Expenses. • Cash Flow Statement: - The classifications are murkier; all changes in Balance Sheet items are still reflected here, and Net Income still flows in as the first item. New items include the add back for the Provision for Credit Losses and the Changes in Gross Loans and Deposits."
        },
        {
         "Question Number": 255,
         "Category": "Financial Institutions Group (FIG)",
         "Question": "How are the financial statements different for an insurance company?",
         "Answer": "• Balance Sheet: - Assets are split into Investment Assets and Non-Investment Assets (Cash, Premiums Receivable, Reinsurance Recoverables, Ceded Unearned Premiums, Deferred Acquisition Costs, etc.). The L&E side has Reserves for Claim Expenses and Unearned Premiums (similar to Deferred Revenue). • Income Statement: - Revenue is divided into Premiums, Net Investment and Interest Income, Gains \/ (Losses), and Other; COGS do not exist; Claims are the major expense, and other expenses include G&A, Acquisition Costs, and Interest Expense. • Cash Flow Statement: - It's similar, but you must reflect changes in the insurance-specific Balance Sheet line items as well. Also, most insurance companies spend a significant amount on Investments, and that could be considered a recurring item within Investing Activities."
        },
        {
         "Question Number": 256,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "How much do you know about what you actually do in restructuring?",
         "Answer": "Restructuring bankers advised distressed companies - businesses going bankrupt, in the midst of bankruptcy, or getting out of bankruptcy --help them change their capital structure to get out of bankruptcy, avoid it in the first place, or assist with a sale of the company depending on the scenario."
        },
        {
         "Question Number": 257,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "What are the 2 different \"sides\" of a Restructuring deal? Do you know which one we usually advise?",
         "Answer": "- Bankers can advise either the debtor (the company itself) or the creditors (anyone that has lent the company) money. It's similar to sell-side vs. buy-side M&A - in one you're advising the company trying to sell or get out of the mess it's in, and in the other you're advising buyers and lenders that are trying to take what they can from the company. - \"Creditors\" are often multiple parties since it's anyone who loaned the company money. There are also \"operational advisors\" that help with the actual turnaround. - Blackstone and Lazard advise the debtor and Houlihan Lokey advises the creditors (these 3 are commonly as the top groups in the field)."
        },
        {
         "Question Number": 258,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "Why are you interested in Restructuring besides the fact that it's a \"hot\" area currently?",
         "Answer": "- Gain a very specialized skill set--> become more valuable\/employable - The work is more technical and interesting than M&A - Broader exposure by seeing bright and not so bright sides of companies"
        },
        {
         "Question Number": 259,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "How are you going to use your experience in Restructuring for your future career goals?",
         "Answer": "- Gain a very specialized skill set--> become more valuable\/employable - Could assist me down the road if I decide to go back to M&A or normal investing too since I'll have superior technical knowledge to other bankers - Could eventually work at a Distressed Investments or Special Situations Fund, which most people outside Restructuring don't have access to. (avoid this though since you'll need to say PE isn't for you and you're in IB for more of the long-haul)"
        },
        {
         "Question Number": 260,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "How would a distressed company select its Restructuring bankers?",
         "Answer": "- More so than M&A or IPO processes, Restructuring\/Distressed M&A requires extremely specialized knowledge and relationships. - There are only a few banks with good practices, and they are selected on the basis of their experience during similar deals in the industry as well as their relationships with all the other parties that will be involved in the deal process. - Lawyers can also be a major source of business, since they're heavily involved with any type of Restructuring\/Distressed scenario."
        },
        {
         "Question Number": 261,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "Why would company go bankrupt in the first place?",
         "Answer": "Here are a few of the more common ones: - A company cannot meet its debt obligations\/interest payments. - Creditors can accelerate debt payments and force the company into bankruptcy. - An acquisition has gone poorly or a company has just written down the value of its assets steeply and needs extra capital to stay afloat (see: investment banking industry). - There is a liquidity crunch and the company cannot afford to pay its vendors or suppliers."
        },
        {
         "Question Number": 262,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "What options are available to a distressed company that can't meet debt obligations?",
         "Answer": "1. Refinance and obtain fresh debt\/equity. 2. Sell the company (either as a whole or in pieces in an asset sale) 3. Restructure its financial obligations to lower interest payments\/debt repayments, or issue debt with PIK interest to reduce the cash interest expense 4. File for bankruptcy and use that opportunity to obtain additional financing, restructure its obligations, and be freed of onerous contracts. --PIK (Payment-in-kind) is payment of interest w\/ additional securities or equity instead of cash. OR the use of a good or service as payment instead of cash"
        },
        {
         "Question Number": 264,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "From the perspective of the creditors, what different strategies do they have available to recover their capital in a distressed situation?",
         "Answer": "These mirror the options that are available to the company itself in a distressed scenario: 1. Lend additional capital\/grant equity to company. 2. Conditional financing - Only agree to invest if the company cuts expenses, stops losing money, and agrees to other terms and covenants. 3. Sale - Force the company to hire an investment bank to sell itself, or parts of itself. 4. Foreclosure - Bank seizes collateral and forces a bankruptcy filing."
        },
        {
         "Question Number": 265,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "How are Restructuring deals different from other types of transactions?",
         "Answer": "-More complex, involve more parties, require more specialized\/technical skills, and have to follow the Bankruptcy legal code -Unlike most standard M&A deals the negotiation extends beyond two \"sides\" - it's not just the creditors negotiating with the debtors, but also the different creditors negotiating with each other. -Distressed sales can happen very quickly if the company is on the brink of bankruptcy, but those are different from Bankruptcy scenarios."
        },
        {
         "Question Number": 266,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "What's the difference between Chapter 7 and Chapter 11 bankruptcy?",
         "Answer": "- Ch 7 -\"liquidation bankruptcy\" - the company is too far past the point of reorganization and must instead sell off its assets and pay off creditors. A trustee ensures that all this happens according to plan. - Ch 11 - more of a \"reorganization\" - the company doesn't die, but instead changes the terms on its debt and renegotiates everything to lower interest payments and the dollar value of debt repayments. -- Ch 7 = heart attack -- Ch 11 = rehab"
        },
        {
         "Question Number": 267,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "What is debtor-in-possession (DIP) financing and how is it used with distressed companies?",
         "Answer": "- It is money borrowed by the distressed company that has repayment priority over all other existing secured\/unsecured debt, equity, and other claims, and is considered \"safe\" by lenders because it is subject to stricter terms than other forms of financing. - Theoretically, this makes it easier for distressed companies to emerge from the bankruptcy process - though some argue that DIP financing is actually harmful on an empirical basis. Some DIP lending firms are known for trying to take over companies at a significant discount due to the huge amount of collateral they have. - One reason companies might choose to file for (Chapter 11) bankruptcy is to get access to DIP financing."
        },
        {
         "Question Number": 268,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "How would you adjust the 3 financial statements for a distressed company when you're doing valuation or modeling work?",
         "Answer": "Here are the most common adjustments: • Adjust Cost of Goods Sold for higher vendor costs due to lack of trust from suppliers. • Add back non-recurring legal \/ other professional fees associated with the restructuring and\/or distressed sale process. • Add back excess lease expenses (again due to lack of trust) to Operating Income as well as excess salaries (often done so private company owners can save on taxes). • Working Capital needs to be adjusted for receivables unlikely to turn into cash, overvalued\/insufficient inventory, and insufficient payables. • CapEx spending is often off (if it's too high that might be why they're going bankrupt, if it's too low they might be doing that artificially to save money)."
        },
        {
         "Question Number": 269,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "Would those adjustments differ for public companies vs. private companies?",
         "Answer": "Most of the above would apply to public companies as well, but the point about excess salaries does not hold true - it's much tougher for public companies to manipulate the system like that and pay abnormal salaries."
        },
        {
         "Question Number": 270,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "If the market value of a distressed company's debt is greater than the company's assets, what happens to its equity?",
         "Answer": "-Shareholder's Equity goes negative (which is actually not that uncommon and happens all the time in LBOs and when a company is unprofitable). -Equity Market Cap (which is different - that's just shares outstanding * share price) would remain positive, though, as that can never be negative."
        },
        {
         "Question Number": 271,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "In a bankruptcy, what is the order of claims on a company's assets?",
         "Answer": "1. New debtor-in-possession (DIP) lenders (see explanation above) 2. Secured creditors (revolvers and \"bank debt\") 3. Unsecured creditors (\"high-yield\" bonds) 4. Subordinated debt investors (similar to high-yield bonds) 5. Mezzanine investors (convertibles, convertible preferred stock, preferred stock, PIK) 6. Shareholders (equity investors) -\"Secured\" means that the lender's claims are protected by specific assets or collateral; unsecured means anyone who has loaned the company money without collateral."
        },
        {
         "Question Number": 272,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "How do you measure the cost of debt for a company if it is too distressed to issue additional debt (i.e. investors won't buy any debt from them)?",
         "Answer": "- Have to look at the yields of bonds or the spreads of credit default swaps of comparable companies to get a sense of this. - Could also just use the current yields on a company's existing debt to estimate this, though it may be difficult if the existing debt is illiquid."
        },
        {
         "Question Number": 273,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "How would valuation change for a distressed company?",
         "Answer": "- You use the same methodologies most of the time (public company comparables, precedent transactions, DCF)... - Except you look more at the lower range of the multiples and make all the accounting adjustments we went through above. - You also use lower projections for a DCF and anything else that needs projections because you assume a turnaround period is required. - You might pay more attention to revenue multiples if the company is EBIT\/EBITDA\/EPS-negative. - You also look at a liquidation valuation under the assumption that the company's assets will be sold off and used to pay its obligations. - Sometimes you look at valuations on both an assets-only basis and a current liabilities-assumed basis. This distinction exists because you need to make big adjustments to liabilities with distressed companies."
        },
        {
         "Question Number": 274,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "How would a DCF analysis be different in a distressed scenario?",
         "Answer": "-Even more of the value would come from the terminal value since you normally assume a few years of cash flow-negative turnaround. -Might also do a sensitivity table on hitting or missing earnings projections, and also add a premium to WACC (weighted average cost of capital) to make it higher and account for operating distress."
        },
        {
         "Question Number": 275,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "Let's say a distressed company approaches you and wants to hire your bank to sell it in a distressed sale - how would the M&A process be different than it would for a healthy company?",
         "Answer": "1. Timing is often quick since the company needs to sell or else they'll go bankrupt. 2. Sometimes you'll produce fewer \"upfront\" marketing materials (Information Memoranda, Management Presentations, etc.) in the interest of speed. 3. Creditors often initiate the process rather than the company itself. 4. Unlike normal M&A deals, distressed sales can't \"fail\" - they result in a sale, a bankruptcy or sometimes a restructuring."
        },
        {
         "Question Number": 276,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "Normally in a sell-side M&A process, you always want to have multiple bidders to increase competition. Is there any reason they'd be especially important in a distressed sale?",
         "Answer": "- Yes - in a distressed sale you have almost no negotiating leverage because you represent a company that's about to die. - The only real way to improve price for your client is to have multiple bidders."
        },
        {
         "Question Number": 277,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "The 2 basic ways you can buy a company are through a stock purchase and an asset purchase. What's the difference, and what would a buyer in a distressed sale prefer? What about the seller?",
         "Answer": "- Stock purchase - you acquire 100% of a company's shares as well as all its assets and liabilities (on and off-balance sheet). - Asset purchase - you acquire only certain assets of a company and assume only certain liabilities (so you can pick and choose exactly what you're getting) - Companies typically use asset purchases for divestitures, distressed M&A, and smaller private companies; anything large, public, and healthy generally needs to be acquired via a stock purchase. - A buyer almost always prefers an asset purchase so it can avoid assumption of unknown liabilities (there are also tax advantages for the buyer). - A (distressed) seller almost always prefers a stock purchase so it can be rid of all its liabilities and because it gets taxed more heavily when selling assets vs. selling the entire business."
        },
        {
         "Question Number": 278,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "Sometimes a distressed sale does not end in a conventional stock\/asset purchase - what are some other possible outcomes?",
         "Answer": "• Foreclosure (either official or unofficial) • General assignment (faster alternative to bankruptcy) • Section 363 asset sale (a faster, less risky version of a normal asset sale) • Chapter 11 bankruptcy • Chapter 7 bankruptcy"
        },
        {
         "Question Number": 279,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "Normally M&A processes are kept confidential - is there any reason why a distressed company would want to announce the involvement of a banker in a sale process?",
         "Answer": "- Generally the company does it if they want more bids \/ want to increase competition and drive a higher purchase price - This happens even outside distressed sales"
        },
        {
         "Question Number": 280,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "Are shareholders likely to receive any compensation in a distressed sale or bankruptcy?",
         "Answer": "- Technically, the answer is \"it depends\" but practically speaking most of the time the answer is \"no.\" - If a company is truly distressed, the value of its debts and obligations most likely exceed the value of its assets - So equity investors rarely get much out of a bankruptcy or distressed sale, especially when it ends in liquidation."
        },
        {
         "Question Number": 281,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "Let's say a company wants to sell itself or simply restructure its obligations - why might it be forced into a Chapter 11 bankruptcy?",
         "Answer": "In a lot of cases, aggressive creditors force this to happen - if they won't agree to the restructuring of its obligations or they can't finalize a sale outside court, they might force a company into Chapter 11 by accelerating debt payments."
        },
        {
         "Question Number": 282,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "Recently, there has been news of distressed companies like GM \"buying back\" their debt for 50 cents on the dollar. What's the motivation for doing this and how does it work accounting-wise?",
         "Answer": "- The motivation is simple: use excess balance sheet cash to buy back debt on-the-cheap and sharply reduce interest expense and obligations going forward. It works because the foregone interest on cash is lower than whatever interest rate they're paying on debt - so they reduce their net interest expense no matter what. - Many companies are faced with huge debt obligations that have declined significantly in value but which still have relatively high interest rates, so they're using the opportunity to rid themselves of excess cash and cancel out their existing debt. - Accounting-wise, it's simple: Balance Sheet cash goes down and debt on the Liabilities & Equity side goes down by the same amount to make it balance."
        },
        {
         "Question Number": 283,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "What kind of companies would most likely enact debt buy-backs?",
         "Answer": "Most likely over-levered companies - ones with too much debt - that were acquired by PE firms in leveraged buyouts during the boom years, and now face interest payments they have trouble meeting, along with excess cash."
        },
        {
         "Question Number": 284,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "Why might a creditor might have to take a loss on the debt it loaned to a distressed company?",
         "Answer": "- This happens to lower-priority creditors all the time. - Remember, secured creditors always come first and get first claim to all the proceeds from a sale or series of asset sales; - If a creditor is lower on the totem pole, they only get what's left of the proceeds so they have to take a loss on their loans\/obligations."
        },
        {
         "Question Number": 285,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "What is the end goal of a given financial restructuring?",
         "Answer": "- A restructuring does not change the amount of debt outstanding in and of itself - Instead, it changes the terms of the debt, such as interest payments, monthly\/quarterly principal repayment requirements, and the covenants."
        },
        {
         "Question Number": 286,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "What's the difference between a Distressed M&A deal and a Restructuring deal?",
         "Answer": "- \"Restructuring\" is one possible outcome of a Distressed M&A deal. - A company can be \"distressed\" for many reasons, but the solution is not always to restructure its debt obligations - it might declare bankruptcy, it might liquidate and sell off its assets, or it might sell 100% of itself to another company. - \"Restructuring\" just refers to what happens when the distressed company in question decides it wants to change around its debt obligations so that it can better repay them in the future."
        },
        {
         "Question Number": 287,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "What's the difference between acquiring just the assets of a company and acquiring it on a \"current liabilities assumed\" basis?",
         "Answer": "- When you acquire the assets of a distressed company, you get literally just the assets. - But when you acquire the current liabilities as well, you need to make adjustments to account for the fact that a distressed company's working capital can be extremely skewed. - Specifically, \"owed expense\" line items like Accounts Payable and Accrued Expenses are often much higher than they would be for a healthy company, so you need to subtract the difference if you're assuming the current liabilities. - This results in a deduction to your valuation - so in most cases the valuation is lower if you're assuming current liabilities."
        },
        {
         "Question Number": 288,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "How could a decline in a company's share price cause it to go bankrupt?",
         "Answer": "-T rick question. Remember, MARKET CAP DOES NOT EQUAL SHAREHOLDERS' EQUITY. You might be tempted to say something like, \"Shareholders' equity falls!\" but the share price of the company does not affect shareholders' equity, which is a book value. - What actually happens: as a result of the share price drop, customers, vendors, suppliers, and lenders would be more reluctant to do business with the distressed company - so its revenue might fall and its Accounts Payable and Accrued Expenses line items might climb to unhealthy levels. - All of that might cause the company to fail or require more capital, but the share price decline itself does not lead to bankruptcy. - In the case of Bear Stearns in 2008, overnight lenders lost confidence as a result of the sudden share price declines and it completely ran out of liquidity as a result... which is a big problem when your entire business depends on overnight lending."
        },
        {
         "Question Number": 289,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "What happens to Accounts Payable Days with a distressed company?",
         "Answer": "They rise and the average AP Days might go well beyond what's \"normal\" for the industry - this is because a distressed company has trouble paying its vendors and suppliers."
        },
        {
         "Question Number": 290,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "Let's say a distressed company wants to raise debt or equity to fix its financial problems rather than selling or declaring bankruptcy. Why might it not be able to do this?",
         "Answer": "• Debt: Sometimes if the company is too small or if investors don't believe it has a credible turnaround plan, they will simply refuse to lend it any sort of capital. • Equity: Same as above, but worse - since equity investors have lower priority than debt investors. Plus, for a distressed company getting \"enough\" equity can mean selling 100% or near 100% of the company due to its depressed market cap."
        },
        {
         "Question Number": 291,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "Will the adjusted EBITDA of a distressed company be higher or lower than the value you would get from its financial statements?",
         "Answer": "In most cases it will be higher because you're adjusting for higher-than-normal salaries, one-time legal and restructuring charges, and more."
        },
        {
         "Question Number": 292,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "Would you use Levered Cash Flow for a distressed company in a DCF since it might be encumbered with debt?",
         "Answer": "No. In fact, with distressed companies it's really important to analyze cash flows on a debt-free basis precisely because they might have higher-than-normal debt expenses."
        },
        {
         "Question Number": 293,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "Let's say we're doing a Liquidation Valuation for a distressed company. Why can't we just use the Shareholders' Equity number for its value? Isn't that equal to Assets minus Liabilities?",
         "Answer": "- In a Liquidation Valuation you need to adjust the values of the assets to reflect how much you could get if you sold them off separately. - You might assume, for example, that you can only recover 50% of the book value of a company's inventory if you tried to sell it off separately. - Shareholders' Equity is equal to Assets minus Liabilities, but in a Liquidation Valuation we change the values of all the Assets so we can't just use the Shareholders' Equity number."
        },
        {
         "Question Number": 294,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "What kind of recovery can you expect for different assets in a Liquidation Valuation?",
         "Answer": "This varies A LOT by industry, company and the specific assets, but some rough guidelines: - Cash: Probably close to 100% because it's the most liquid asset. - Investments: Varies a lot by what they are and how liquid they are - you might get close to 100% for the ones closet to cash, but significantly less than that for equity investments in other companies. - Accounts Receivable: Less than what you'd get for cash, because many customers might just not \"pay\" a distressed company. - Inventory: Less than Cash or AR because inventory is of little use to a different company. - PP&E: SImilar to cash for land and buildings, and less than that for equipment. - Intangible Assets: 0%. No one will pay you anything for Goodwill or the value of a brand name - or if they will, it's near-impossible to quantify."
        },
        {
         "Question Number": 295,
         "Category": "Restructuring (Rx)\/Distressed M&A",
         "Question": "How would an LBO model for a distressed company be different?",
         "Answer": "- The purpose of an LBO model here is not to determine the private equity firm's IRR, but rather to figure out how quickly the company can pay off its debt obligations as well as what kind of IRR any new debt\/equity investors can expect. - Other than that, it's not much different from the \"standard\" LBO model - the mechanics are the same, but you have different kinds of debt (e.g. Debtor-in-Possession), possibly more tranches, and the returns will probably be lower because it's a distressed company, though occasionally \"bargain\" deals can turn out to be very profitable. - One structural difference is that a distressed company LBO is more likely to take the form of an asset purchase rather than a stock purchase."
        },
        {
         "Question Number": 296,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "Why is EBITDA important?",
         "Answer": "- Proxy for CF - Leverage neutral - EV multiple - Doesn't include many nonrecurring items"
        },
        {
         "Question Number": 297,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "What does EBITDA lack and not take into account?",
         "Answer": "- Capex - Working capital - Doesn't compare 2 companies apples-to-apples (e.g. two retail companies where one company may rent stores and the other actually owns the stores as high fixed assets. With EBITDA, the one store that rents, has rent expense included, whereas the company that has large depreciation expense due to high PPE that's excluded.)"
        },
        {
         "Question Number": 298,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "Two firms of equal EBITDA and IRR. Which one do you invest in? What factors do you look for?",
         "Answer": "If only equal EBITDA, look at capex, working capital, and actual FCF if everything else is exactly the same. If they have identical IRRs also, then you need to consider factors such as risk to assumptions and cash flows. What is the growth of the business and how confident are you? What are the industry dynamics and risk factors? What is the sustainability of business model? Are they overly exposed to a large supplier or volatile input such as a commodity? Barriers to entry, is it a fully competitive market?"
        },
        {
         "Question Number": 299,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "Describe the different pieces of capital structure.",
         "Answer": "Revolver, term loan A,B, Mezzanine, High Yield debt, preferred equity, common, options\/warrants. Revolver and term loan secured. High Yield usually unsecured"
        },
        {
         "Question Number": 300,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "Do you think a multiple of EBITDA is always the most appropriate financial metric to buy off of? What about P\/E?",
         "Answer": "Well it does not take into account Capital expenditures or investment in working capital. Sometimes EBIT is the better multiple with companies with large rent expense vs. high D&A. If there is negative EBITDA, a revenue multiple may be more appropriate. P\/E takes leverage into consideration which is not good if you plan to alter the capital structure. Often includes non recurring and unusual accounting differences."
        },
        {
         "Question Number": 301,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "How do you view maintenance, growth, and acquisition capex when analyzing a company?",
         "Answer": "If a company has high capital expenditures but relatively low maintenance capex, then it could still be a good LBO candidate. Key to determine how much of the capex is discretionary and how much is mandatory"
        },
        {
         "Question Number": 302,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "Describe sources and uses to me. What are 4 main pieces of both?",
         "Answer": "Sources are the source of the capital used to finance a transaction. - Excess cash, senior debt, subordinated debt, and sponsor equity Uses are the use of that capital in the transaction - Equity purchase price, refinance existing debt, fees"
        },
        {
         "Question Number": 303,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "Explain how leverage is beneficial to equity holder",
         "Answer": "Allows for a smaller equity check, debt is cheaper than equity on required returns, and it also provides a tax shield"
        },
        {
         "Question Number": 304,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "How do the following affect IRRs? 1. Greater asset write-up 2. Using less excess cash 3. Tax shield",
         "Answer": "1. No effect b.c. write up in assets is not depreciable 2. Lowers IRR b.c. more sponsor equity or debt in 3. Improves IRR b.c. it lowers amount of cash outflow"
        },
        {
         "Question Number": 305,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "Why can a company such as a manufacturing company be more highly levered?",
         "Answer": "Typically the cash flows are more stable, and there are assets to collateralize the debt. You can also lever individual plants on occasion and that does not hurt the debt capacity of the parent co."
        },
        {
         "Question Number": 306,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "What is IRR? How do you determine it?",
         "Answer": "It's the return necessary for an investment's NPV to equal zero. Determined by equity injected upfront and then equity portion 3-5 years out. Solve for discount rate necessary for future equity value to equal initial investment"
        },
        {
         "Question Number": 307,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "When should a company issue debt instead of equity?",
         "Answer": "As long as the cash flows from the business can adequately cover the interest payments and as long as the cost of debt is less than the cost of equity. At some point the riskiness of additional debt will push the cost of debt above that of cost of equity."
        },
        {
         "Question Number": 308,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "Suppose you've build a model with the following assumptions: - Revenue in year 2=$100mm - EBITDA in year 2=$10mm - 50% fixed to variable costs Assume revenue drops by 10% in year 3, what is the impact on EBITDA?",
         "Answer": "Key here is to remember fixed vs. variable. 50% expenses fixed and the other 50% declines by 10%. So EBITDA is $4.5MM"
        },
        {
         "Question Number": 309,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "How do you make money in an LBO?",
         "Answer": "Pay down debt, expand EBITDA through revenue growth and margin improvement, company is perceived to be better all around company within the space and people are willing to pay a higher EBITDA multiple (Multiple Expansion), better management team can help with these areas"
        },
        {
         "Question Number": 310,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "What EBITDA and Gross Margin % do you look for in a good candidate?",
         "Answer": "Depends on the industry. Generally 50% gross margin and 20% EBITDA margin would be good"
        },
        {
         "Question Number": 311,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "Walk me through the impact of interest expense?",
         "Answer": "Net income is reduced by after-tax amount of interest. That lowers your CFO which limits the amount of cash you have for capital expenditures, working cap investments, and debt amortization. Lower cash is then reflected in balance sheet. Also RE is hit because of lower net income"
        },
        {
         "Question Number": 312,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "What is the difference between a DCF model and an LBO model?",
         "Answer": "Both based on cash flows of the business, but DCF is standalone, whereas LBO is used within an acquisition context. LBO is a floor valuation that enables you to see what levels of premium, debt capacity, margin assumptions you, and exit multiples are necessary to get to a desired IRR."
        },
        {
         "Question Number": 313,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "How do you calculate DSO, inventory turns, and days payable?",
         "Answer": "‒ Receivables\/Sales * 365 ‒ Inventory\/COGS * 365 ‒ Accounts payable\/COGS * 365"
        },
        {
         "Question Number": 314,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "What factors influence debt capacity?",
         "Answer": "‒ Amount and stability of cash flows ‒ Conditions of financing markets ‒ Availability of assets for security"
        },
        {
         "Question Number": 315,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "If you are making an investment, what are the first three financial items you want to know?",
         "Answer": "Historical and projected revenues Historical and projected EBITDA Historical and projected CapEx"
        },
        {
         "Question Number": 316,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "What are the pros and cons of an M&A exit?",
         "Answer": "Pros: accessibility of additional resources, liquidity Cons: loss of control, closures or job losses"
        },
        {
         "Question Number": 317,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "What are the pros and cons of an IPO exit?",
         "Answer": "Pros: opportunity for growth, increased visibility, profitability, opportunity for liquidity, attract personnel with stock plans Cons: significant time and money, increased scrutiny, ongoing disclosure, control reduced, market reliance"
        },
        {
         "Question Number": 318,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "What financing multiples are most important? What type of financing multiples are you seeing in the market today?",
         "Answer": "- Total Debt \/ EBITDA = 5.5x - 7.0x depending on industry and cash flows - Total Adj. Debt \/ EBITDAR (for retailers) = 6.0x - 6.5x - EBITDA \/ Interest Expense = 3.0x and above - FCF \/ Total Debt = 5% and above"
        },
        {
         "Question Number": 319,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "How do private equity firms make money?",
         "Answer": "- Mgmt fees - Carried interest - Co-invest opportunities for execs and employees of buyout firm"
        },
        {
         "Question Number": 320,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "Why would someone want to invest in PE?",
         "Answer": "- Proven returns as high as any asset class over time - Considered some of most sophisticated and successful finance professionals - Top quartile funds can generate 15-20% returns per year to their investors - PE firms highly incentivized to generate returns for clients and interested aligned - Placing capital in hands of those with inside information on private companies"
        },
        {
         "Question Number": 322,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "Assuming that two companies have an enterprise value of 600 and EBITDA of 100, what are reasons why the P\/E ratios would be different?",
         "Answer": "Income Statement 1) D&A - lower D&A will result in a higher net income and a lower P\/E multiple 2) Tax Rate - lower tax rate will result in higher net income and a lower P\/E multiple Balance Sheet 1) Cash - higher cash balance will result in a higher P\/E 2) Leverage - if the after tax interest rate is less than the unlevered earnings yield, the result of adding any leverage will be to lower the P\/E multiple"
        },
        {
         "Question Number": 323,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "If you are a CFO and you're about to miss earnings by $0.01, what are some things you can do to change this so you don't miss earnings?",
         "Answer": "1) Switch inventory accounting methods if the cost of goods sold movements are in your favor. If costs are going up and you are currently reporting LIFO, could switch to FIFO so that goods you sell have a lower cost basis. And vice versa if costs are going down. 2) To the extent allowed, switching amortization life lengths could reduce expenses and raise EPS 3) Could buy back shares to reduce total shares outstanding in order to increase EPS"
        },
        {
         "Question Number": 324,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "What is Sarbanes-Oxley and what are the implications?",
         "Answer": "Sarbanes-Oxley was a bill passed by Congress in 2002 in response to a number of accounting scandals. To reduce the likelihood of accounting scandals, the law established new or enhanced standards for publicly held companies. Those in favor of this law believe it will restore investor confidence by increasing corporate accounting controls. Those opposed to this law believe it will hinder organizations that do not have a surplus of funds to spend on adhering to the new accounting policies"
        },
        {
         "Question Number": 325,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "You are on the board of directors of a company and own a significant chunk of the company. The CEO, in his annual presentation, states that the company's stock is doing well, as it has gone up 20 percent in the last 12 months. Is the company's stock in fact doing well?",
         "Answer": "- trick question: ask what the Beta is first - If Beta is 1, and market has gone up 50%, then company actually has not done well compared to market"
        },
        {
         "Question Number": 326,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "Of the four debt covenants (minimum EBITDA, maximum capex, minimum interest coverage, maximum leverage), which one is the most important?",
         "Answer": "Minimum EBITDA because EBITDA is the basis of valuation, and if the company can't make its EBITDA covenant, it's a signal that there might be something operationally wrong with the company. A company can sell assets to pay down debt and reduce interest expense, but that will not solve underlying business problems."
        },
        {
         "Question Number": 327,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "Given negative news about a company, what happens to the pricing of the equity versus the senior debt?",
         "Answer": "ince equity is riskier and there is more uncertainty associated with it, the equity will be more volatile and decline in price by a greater percentage than the debt."
        },
        {
         "Question Number": 328,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "Given that there is no multiple expansion and flat EBITDA, how can you still generate a return?",
         "Answer": "Reduce interest expense, improve tax rate, depreciation tax shield, the simple act of leverage, pay down debt, pay a dividend, reduce capex, reduce working capital requirements and reduce change in other."
        },
        {
         "Question Number": 329,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "What is the different between bank loan and high-yield debt covenants?",
         "Answer": "Bank loans are more strict. For looser covenants, high-yield debt is rewarded with higher interest rates. Covenants can restrict economic activities, finance activities or accounting measurements"
        },
        {
         "Question Number": 330,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "Would you rather have an extra dollar of debt paydown or an extra dollar of EBITDA?",
         "Answer": "EBITDA b.c. of multiplier effect - extra dollar of debt increases equity value by one dollar; extra dollar of EBITDA is multiplied by exit multiple, which results in a great value creation"
        },
        {
         "Question Number": 331,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "You have a company with 3x senior leverage and 5x junior leverage, what happens when you sell a business for 9x EBITDA? What happens when you sell the asset for 8x EBITDA?",
         "Answer": "9x: It's a de-leveraging transaction because pro-forma the company will have a lower total debt to EBITDA ratio. For the 8x EBITDA scenario, on a firm basis, it has a neutral impact, but it is de-leveraging on a senior debt basis."
        },
        {
         "Question Number": 332,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "In an LBO, if cost of debt is 10 percent, what is the minimum return required to break even? Assume a tax rate of 30%.",
         "Answer": "Since interest is tax deductible, the break-even return is the after-tax cost of debt. Assuming tax rate of 30 percent, the break-even return is 7 percent."
        },
        {
         "Question Number": 333,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "Explain the concept of duration.",
         "Answer": "Duration = sensitivity of price of bond relative to interest rates (duration of 2 means ~2% price decline in bond price per 1% increase in rates) - first derivative of price\/rate function"
        },
        {
         "Question Number": 334,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "What are some other items that are \"debt like\" and may be added to EV?",
         "Answer": "Capital leases, some operating leases, unfunded pension obligations, restructuring and environmental liabilities"
        },
        {
         "Question Number": 335,
         "Category": "Private Equity\/Buyside Recruiting",
         "Question": "What are some other items that are \"cash like\" and may be subtracted from EV?",
         "Answer": "NOLs, short\/long term investments, equity investments (from 20%-50% ownership of a company) (depending how liquid they are)"
        },
        {
         "Question Number": 336,
         "Category": "Accounting",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "Assuming a 30% tax rate, walk me through 3 statements with a: $120 decrease in depreciation",
         "Answer": "Starting on the IS... Pre-tax income up $120, NI up 84 Moving onto the SCF... NI up 84, back out depreciation as non-cash, net change in cash is down 36 Finally, on the BS... A: Assets up 84; Cash down 36, PP&E up 120 L: No Change SE: Shareholder's Equity up 84; NI up by 84 ...and the Balance Sheet balances"
        },
        {
         "Question Number": 337,
         "Category": "Accounting",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "Assuming a 30% tax rate, walk me through 3 statements with a: $50 increase in stock-based compensation",
         "Answer": "Starting on the IS... Pre-tax income down by 50, NI down by 35 Moving onto the SCF... NI down by 35, add back 50 in CFO since stock-based compensation is non-cash expense, net change in cash is up 15 Finally, on the BS... A: Assets up by 15; cash up 15 L: No change in liabilities SE: Shareholder's Equity up by 15; Stock-based compensation up 50 and NI down 35 ...and the Balance Sheet balances"
        },
        {
         "Question Number": 338,
         "Category": "Accounting",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "Assuming a 30% tax rate, walk me through 3 statements with a: $100 interest expense (50% cash interest \/ 50% PIK interest) and $50 interest income",
         "Answer": "Starting on the IS... Net interest expense down 50, pre-tax income down by 50, NI down by 35 Moving onto the SCF... NI down by 35, add back 50 from PIK interest in CFO, so cash at bottom is up by 15 Finally, on the BS... A: Assets up 15, Cash up 15 L: Liabilities up 50, Long-term debt up 50 SE: Equity down 35, Retained earnings down 35 ...and the Balance Sheet balances"
        },
        {
         "Question Number": 339,
         "Category": "Accounting",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "Assuming a 30% tax rate, walk me through 3 statements with a: $20 decrease in Deferred Revenue",
         "Answer": "Starting on the IS... Revenue up by 20; assuming no additional expenses, pre-tax income up by 20, NI up by 14 Moving onto the SCF... NI up by 14, subtract 20 from Deferred Revenue decrease under CFO, so cash at bottom is down by 6 Finally, on the BS... A: Assets down 6, Cash down 6 L: Liabilities down 20, Deferred Revenue down 20 SE: Equity up 14, Retained Earnings up 14 ...and the Balance Sheet balances"
        },
        {
         "Question Number": 340,
         "Category": "Accounting",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "MULTI-STEP: Assuming a 20% tax rate, walk me through 3 statements with a: Year 0: Buy PP&E for $100 using Debt. Walk through the 3 statements. Year 2: PP&E depreciates over 10-year period using straight-line depreciation. After two years, you sell the PP&E for $120. Assume depreciation has been accounted for on the financial statements. Walk through the 3 statements after the sale of PP&E.",
         "Answer": "YEAR 0 -- Starting on the IS... No change Moving onto the SCF... In CFI, outflow of cash $100 to purchase PP&E. In CFF, inflow of cash $100 because debt was raised. So, net change in cash is $0. Finally, on the BS... A: PP&E up $100 L: Debt up $100 SE: No change ...and the Balance Sheet balances YEAR 2 -- Starting on the IS... Gain on sale recorded positively as 40, pre-tax income up 40, NI up 32 Moving onto the SCF... NI up 32, subtract 40 from gain on sale under CFO, add 120 under CFI, so cash at bottom is up 112 Finally, on the BS... A: Assets up 32, cash up 112, PP&E down 80 L: no change in liabilities SE: Equity up 32, retained earnings up 32 ...and the Balance Sheet balances"
        },
        {
         "Question Number": 341,
         "Category": "Accounting",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "MULTI-STEP: Assuming a 20% tax rate, walk me through 3 statements with a: Year 0: Buy Land for $90 using cash on hand. Walk through the 3 statements. Year 2: Straight-line depreciation occurs over a 10-year period. After two years, you sell the land for $90. Walk through the 3 statements after the sale of land.",
         "Answer": "YEAR 0 -- Starting on the IS... No change Moving onto the SCF... In CFI outflow of $90 for purchase of land, so net change in cash is $90 Finally, on the BS... A: Land up $90, cash down $90 L: No change SE: No change ...and the Balance Sheet balances YEAR 2 -- TRICK QUESTION: Land does not depreciate! Starting on the IS... Gain on sale recorded as 0, pre-tax income up 0, NI up 0 \/ unchanged Moving onto the SCF... NI unchanged Add 90 from sale of land under CFI, cash up by 90 Finally, on the BS... A: Assets unchanged,, cash up 90, land down 90 L: no changes under liabilities SE: NI unchanged"
        },
        {
         "Question Number": 342,
         "Category": "Accounting",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "MULTI-STEP: Assuming a 20% tax rate, walk me through 3 statements with a: You raise $100 debt with 5% interest and 10% yearly principal repayment. You use that money to purchase $100 of short-term assets that have 10% yearly interest income attached. Part 1) Right when you raise the debt and purchase short term assets, walk me through the 3 statements. Part 2) After one year, walk me through the 3 statements.",
         "Answer": "Part 1) Starting on the IS... No change Moving onto the SCF... In CFI, outflow of $100 for short term assets. In CFF, increase of $100 because of debt raised. So, net change in cash is $0. Finally, on the BS... A: Short-term assets up $100. L: Debt up $100. SE: No change. ...and the Balance Sheet balances Part 2) Starting on the IS... Interest income is $10 and interest expense is $5 Pretax income increases by $5, Net Income increases by $4 Moving onto the SCF... Net Income up by $4, in CFF repay $10 of debt, so net change in cash is down $6 Finally, on the BS... A: cash down $6 L: debt down $10 SE: Retained Earnings from Net Income up $4 ...and the Balance Sheet balances"
        },
        {
         "Question Number": 343,
         "Category": "Enterprise & Equity Value",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "How does ____ affect Enterprise Value? Raise $200m in Debt, use cash to buy a new piece of equipment.",
         "Answer": "EV up by 200 Enterprise Value = Equity Value + Debt + Preferred Stock + Non controlling interests - Cash and Cash Equivalents +200m Debt -200m Cash from Debt +200m Cash from Purchase (subtract a negative amount = add) So plugging that into the Enterprise Value equation, Enterprise Value would go up by 200m (since cash is subtracted)"
        },
        {
         "Question Number": 344,
         "Category": "Enterprise & Equity Value",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "How does ____ affect Enterprise Value? Issue $200m in Equity for an IPO.",
         "Answer": "Enterprise Value = Equity Value + Debt + Preferred Stock + Non controlling interests - Cash and Cash Equivalents +200 Equity Value -200 Cash (increase in cash is subtracted from EV) EV unchanged"
        },
        {
         "Question Number": 345,
         "Category": "Enterprise & Equity Value",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "Two companies are 100% comparable. Why might one trade at a premium (e.g. higher EV\/EBITDA multiple)?",
         "Answer": "One company may have higher revenue growth rates or higher EBITDA margins"
        },
        {
         "Question Number": 346,
         "Category": "Enterprise & Equity Value",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "Would you rather buy a company with a high or low P\/E multiple?",
         "Answer": "Generally, would rather buy low and sell high, so would want to buy one with a low P \/ E multiple that increases over time. Remember, P \/ E signifies how much investors are willing to pay per $1 of earnings."
        },
        {
         "Question Number": 347,
         "Category": "Enterprise & Equity Value",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "What are some multiples you could use for a company with a negative Net Income?",
         "Answer": "Revenue-based multiples (e.g. EV \/ Revenue) Industry-specific multiples (e.g. EV \/ Unique Users for internet companies)"
        },
        {
         "Question Number": 348,
         "Category": "Enterprise & Equity Value",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "Company A and Company B have identical EV\/EBITDA. Company A has a higher P\/E multiple. Why might this be the case?",
         "Answer": "Pay attention to the \"ITDA\" in EBITDA - Different capital structures (e.g. one has more debt and thus more interest expense) - Different Depreciation \/ Amortization - Different tax rates"
        },
        {
         "Question Number": 349,
         "Category": "Enterprise & Equity Value",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "You have a company with an EV\/Revenue of 2x and an EV\/EBITDA of 10x. What is the EBITDA margin?",
         "Answer": "20% EBITDA margin = EBITDA \/ Revenue. EBITDA \/ EV EV \/ Revenue = .1 2 = .2"
        },
        {
         "Question Number": 350,
         "Category": "Enterprise & Equity Value",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "A company has a stock price of $20 a share and a P\/E of 20x (so EPS is 1). The company has 10M shares outstanding. How does a 2-for-1 stock split affect EV?",
         "Answer": "Does not affect EV, there are now 20m shares outstanding and EPS is now 0.5"
        },
        {
         "Question Number": 351,
         "Category": "Enterprise & Equity Value",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "A company has 10,000 shares at $20 a share. There are 100 call options at an exercise price of $10, 50 restricted stock units (RSUs) and 100 convertible bonds at a price of $10 and par value of $100. What is the diluted equity value?",
         "Answer": "Diluted Equity Value = 11,100 * 20 = 222,000 (see below) Options: - Company receives $1000, 100 new shares created, company able to buy back 50 shares (50 new shares) RSU: - Add 50 restricted stock units (so far 100 new shares) Convertible Bonds: - Par Value \/ Price = # of shares per convertible bond → $100\/10 = 10 shares per convertible bond * 100 convertible bonds = 1000 new shares - 1000 + 100 (from prev. steps) = 1,100 → diluted share count is 11,100 - Diluted Equity Value = 11,100 * 20 = 222,000"
        },
        {
         "Question Number": 352,
         "Category": "Enterprise & Equity Value",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "How does paying down $100M debt affect a company's enterprise value?",
         "Answer": "In this scenario, we would be spending $100M in cash to pay down $100M in debt. Using the enterprise value formula, the changes in debt and cash would equal each other out. Paying down debt is also considered a capital structure change, so we should immediately recognize that this does not change the enterprise value of the company."
        },
        {
         "Question Number": 353,
         "Category": "Enterprise & Equity Value",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "If two companies have the same growth prospects, market capitalizations and industries why might you value one using EV\/Sales and the other using EV\/EBITDA?",
         "Answer": "Ideally under a comparables analysis, one would use the same trading multiple to evaluate two similar companies. However, there are certain exceptions to this rule that make it appropriate to evaluate one company on the basis of top line sales and one on the basis of EBITDA. Some of these exceptions include: ● Despite having similar growth prospects and business models, one of the companies may have had historical financial weakness and have a negative EBITDA value. If this is the case, then an EV\/EBITDA multiple would not be relevant ● One company may have went through several one-time occurrences such as restructuring costs or legal expenses, which would distort the company's EBITDA value ● The two companies may utilize different business practices that make their EBITDA values incomparable. For example, one company may use operating leases instead of capital leases or rent its properties as opposed to leasing them"
        },
        {
         "Question Number": 354,
         "Category": "Enterprise & Equity Value",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "What characteristics of a company would generate a higher valuation multiple?",
         "Answer": "This premium in valuation corresponds to a greater interest in the company's stock, suggesting that the company has a competitive advantage over its peers. The most common characteristics that lead to this presumed competitive advantage \/ a higher valuation multiple include: ● Higher growth projections than peers ● Market leadership \/ economic moat ● Access to proprietary information or key patents ● Geographic superiority or access to geographically limited resources ● Key personnel such as talented upper management"
        },
        {
         "Question Number": 355,
         "Category": "Enterprise & Equity Value",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "What are limitations of using the Exit Multiple Method when conducting valuation?",
         "Answer": "One of the key limitations of using the Exit Multiple Method is that it is difficult to predict what multiple you will be able to sell the company at in the terminal year. Certain industries such as airlines and automotives are notoriously cyclical and can have wildly different valuation multiples at the trough and peak of the industry. The best way to mitigate this is to sensitize your model to accompany a range of different valuation multiples or concurrently use the Gordon Growth method to provide another data point."
        },
        {
         "Question Number": 356,
         "Category": "Valuation",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "Is a company with a 50x P\/E overvalued or undervalued? Why?",
         "Answer": "- A P\/E multiple alone does not tell us if it is over or undervalued. - We would need to look at the industry average, the expectations for the company's growth and forward performance, and other qualitative and quantitative considerations. - Maybe the industry average is 40x and this company seems overvalued relative to its performance, or maybe it is lagging behind and this multiple is \"cheap\" - You could compare it to the S&P 500 P\/E, but still wouldn't tell you much since its value should be judged relative to its peer companies"
        },
        {
         "Question Number": 357,
         "Category": "Valuation",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "If you could only chose two financial statements to evaluate a mature company, which two would you pick?",
         "Answer": "There are three traditional financial statements: the balance sheet, the income statement, and the cash flow statement. Here, you would want the balance sheet and the income statement, as the cash flow statement can be constructed from these other two statements. This assumes that you would be given the balance sheet for both the beginning of the time period and the end of the time period."
        },
        {
         "Question Number": 358,
         "Category": "Valuation",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "If you could only choose one financial statement to valuate a mature company, which would you pick?",
         "Answer": "It gets a little bit trickier here, but if you could only choose one financial statement then you would likely choose the cash flow statement. This is because the cash and the cash flow statement is the best determinant of a company's health and its ability to sustain itself. Net income can be skewed by different accounting practices, while cash is the one balance sheet item that can be certifiably trusted. With the cash flow statement, you can also gauge important details such as whether the company is utilizing the matching principle as well as its ability to service interest expenses."
        },
        {
         "Question Number": 359,
         "Category": "Valuation",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "What is the difference between intrinsic value and relative value?",
         "Answer": "All valuation methods stem in one way or another from the principles of either intrinsic value or relative value. Financiers often combine both methodologies in arriving at an asset's estimated price. All valuation methods stem in one way or another from the principles of either intrinsic value or relative value. Financiers often combine both methodologies in arriving at an asset's estimated. The relative value of an asset is found by taking into account the value of similar assets, often gauged by trading multiples and financial metrics. Relative valuation methods include but are not limited to: trading comparables, precedent transaction analysis, M&A premiums analysis."
        },
        {
         "Question Number": 360,
         "Category": "DCF",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "What is a DCF\/can you walk me through a DCF in under 60 seconds?",
         "Answer": "\"In a DCF analysis, you value a company with the Present Value of its Free Cash Flows plus the Present Value of its Terminal Value. You can divide the process into 6 steps: 1. Project a company's Free Cash Flows over a 5-10 year period. 2. Calculate the company's Discount Rate, usually using WACC (Weighted Average Cost of Capital). 3. Discount and sum up the company's Free Cash Flows. 4. Calculate the company's Terminal Value. 5. Discount the Terminal Value to its Present Value. 6. Add the discounted Free Cash Flows to the discounted Terminal Value.\""
        },
        {
         "Question Number": 361,
         "Category": "DCF",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "Why do you typically use 5-10 years for the projection period?",
         "Answer": "- Need to project cash flows until they reach a steady state before calculating TV - Also, that's about as far as you can reasonably predict for most companies - Less than 5 years would be too short to be useful - More than 10 years is too difficult to project for most companies."
        },
        {
         "Question Number": 362,
         "Category": "DCF",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "How would you change a DCF to value a highly speculative technology company?",
         "Answer": "- May employ a longer projection period (may take longer for company to reach \"steady state\" of cash flows) - May use a much higher Discount Rate - You may also adjust management's growth or profit expectations"
        },
        {
         "Question Number": 363,
         "Category": "DCF",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "Tell me 3 places where taxes affect a DCF",
         "Answer": "- Calculating Beta (conversion from unlevered to levered) - Calculating FCF (NOPAT) - Calculating Cost of Debt (interest is tax deductible)"
        },
        {
         "Question Number": 364,
         "Category": "DCF",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "If you are valuing a coal mine company, would you use the Gordon Growth Method or the Multiples Method to calculate the TV? Explain.",
         "Answer": "Would use multiples method, since Gordon Growth assumes cash flows exist into perpetuity and coal is a depleting resource"
        },
        {
         "Question Number": 365,
         "Category": "DCF",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "A company buys a factory for $100 in its 4th year. How would the DCF\/Enterprise Value change for the company?",
         "Answer": "- Include additional CapEx spending of $100 in Year 4 of the DCF, which would reduce Free Cash Flow for that year by $100. - The Enterprise Value, in turn, would decrease by the present value of $100 in Year 4. - You would calculate the difference by dividing $100 by ((1 + Discount Rate)^4). Then you would subtract this amount from the Enterprise Value."
        },
        {
         "Question Number": 366,
         "Category": "DCF",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "What is WACC, conceptually? How do you calculate it?",
         "Answer": "- The Discount Rate therefore reflects not just the time value of money, but also the return that investors require before they can invest. - It also represents the \"risk\" of a company, because higher potential returns correspond to higher risk. - Can be thought of as the \"opportunity cost of capital\" - You're determining the \"cost\" of each part of a company's capital structure, and then calculating a weighted average based on how much Equity, Debt, and Preferred Stock it has. - WACC = Cost of Equity % Equity + Cost of Debt % Debt (1 - Tax Rate) + Cost of Preferred Stock % Preferred Stock"
        },
        {
         "Question Number": 367,
         "Category": "DCF",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "How would you calculate the long-term growth rate for the GGM?",
         "Answer": "- Normally you use the country's long-term GDP growth rate, the rate of inflation, or something similarly conservative. - For companies in developed countries, a long-term growth rate over 5% would be quite aggressive since most developed economies are growing at much less than 5% per year (2-3% may be more realistic)."
        },
        {
         "Question Number": 369,
         "Category": "DCF",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "What are common alterations that one can make to the basic WACC formula to make it more company-specific?",
         "Answer": "The basic WACC formula is a fairly generic formula that can be improved upon by accounting for nuances in a company's business model or capital structure. A couple of examples for making it more company-specific include: ● If assessing a private company or a company with a small market capitalization, one could add a size premium or a liquidity discount. This can be accomplished simply by multiplying the entire WACC by a %, with typical discounts ranging from 15 - 30% ● On top of the standard vehicles of debt and equity, a company may employ preferred shares in their capital structure. One can account for this in the WACC by adding another component to the equation of cost of preferred shares x preferred shares' composition of total capitalization ● If a company recently IPO'd, there may be no historical beta available. Similarly, if a company has no true comparables, using beta to derive cost of equity may not be appropriate. If possible, using the DDM formula to calculate cost of equity would improve the WACC formula for these companies, provided that it has a predictable dividend policy"
        },
        {
         "Question Number": 370,
         "Category": "DCF",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "Ignoring the effect of taxes, how would changing from LIFO to FIFO affect FCF during a period of rising costs?",
         "Answer": "LIFO (Last in First Out) is the inventory accounting method that recognizes the more recently purchased inventory as COGS, i.e. the \"last goods in\" are recognized as the \"first goods out\". During a period of rising costs, this suggests that COGS would be composed of the more expensively purchased goods. FIFO (First in First Out) applies the opposite practice, in which the earliest purchased inventory is treated as COGS. Newer inventory, which in this scenario would be purchased at a comparatively higher price, would remain on the balance sheet. In a period of rising costs, FIFO has a lower COGS but has a higher balance sheet value. With regards to free cash flow, we should think through the equation to determine its net change. Firstly, COGS decreases, which increases the gross profit and eventually increases the free cash flow. However, we must remember that the inventory amount has increased because more expensive goods are now on the balance sheet. This increase in inventory is an increase in working capital, which is a use of cash. Ignoring taxes, this would be the exact same amount as the COGS decrease, which nullifies the previous effect of COGS and makes the FCF perfectly neutral. The conclusion here is that changes in the accounting policy will not materially affect FCF and should not affect valuation. Changing the accounting policy may manipulate the financial results on the income statement or balance sheet, but hold little relevance to a company's true value."
        },
        {
         "Question Number": 371,
         "Category": "DCF",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "In a DCF valuation, which of the following 3 actions increases the valuation the most: a $10 decrease in capital expenditures, a $10 decrease in expenses or a $10 increase in revenues?",
         "Answer": "All three of these changes will increase the calculated value in a discounted cash flow model, as they either decreases cash outflows or increase cash inflows. However, some of these changes would not move in isolation and would not necessarily result in an increase in company value of $10. The ranking of attractiveness is as follows: ● First would be a decrease in capital expenditures because it is a direct cash use and there is no tax deduction component. Decreasing capital expenditures by $10 directly improves the value of a company by $10, although it is arguable that it may hurt the ability to generate cash flows in the future ● Second would be a decrease in expenses because is only affected by tax. Flowing through an income statement, you would get a direct increase in value equal to $10 * (1-t) ● Third would be an increase in revenues because any generation of revenues requires associated COGS. In addition to COGS, gross profit would also be subject to tax, making this impact on valuation lower"
        },
        {
         "Question Number": 372,
         "Category": "DCF",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "What is the difference between asset beta and equity beta?",
         "Answer": "These two terms are alternate definitions for traditional definitions for betas; asset beta is simply unlevered beta and equity beta is simply levered beta. The unlevered beta is the risk of an asset without the additional risk of any leverage that the asset has, which would represent the company's debt. Additional leverage increases the risk level for the equity holder, which is accounted for with the levered beta."
        },
        {
         "Question Number": 373,
         "Category": "DCF",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "How would raising $100M debt in Year 3 affect the DCF valuation of a company?",
         "Answer": "Within the context of a DCF, the amount of debt you have directly impacts the WACC formula. Accordingly, you could change the WACC formula for periods after Year 3 and discount cash flows beyond that at the new WACC. Note that the other component of the DCF valuation is based on unlevered free cash flows, so additional interest from any raised debt will not affect them."
        },
        {
         "Question Number": 374,
         "Category": "Merger Model (M&A)",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "Company A has a P\/E of 5x and Company B has a P\/E of 8x. If Company A purchases Company B in an all-stock deal, is the deal accretive or dilutive?",
         "Answer": "The deal is dilutive because Company A is purchasing a company with a lower earnings yield in an all-stock deal. A quick shortcut is to just compare the P\/E multiples of both companies: if you purchase a company with a lower P\/E in an all-stock deal, the transaction will be accretive, if you purchase a company with a higher P\/E in an all-stock deal, the transaction will be dilutive. This question is asking whether the deal is accretive or dilutive. A deal is accretive if the pro forma EPS (i.e. after the acquisition) of the company is higher than the original company's EPS. The change in EPS is dependent on additional earnings from the acquired company, additional interest from raised debt, the opportunity cost of cash and any newly issued shares. This transaction being an all-stock deal indicates that there will be no new raised debt and no foregone cash. In an all-stock deal, companies use their own shares as a form of currency, so we start by determining the cost of stock for Company A. Here, we can invert the P\/E of the company to determine what the cost of equity would be. Inverting the P\/E arrives at the company's earnings yield and implies how much earnings investors get per dollar of share (e.g. inverting 5x gets 20% and implies that an investor gets $0.20 for every dollar invested). We apply the same methodology and invert the P\/E of Company B, arriving at a 12.5% earnings yield."
        },
        {
         "Question Number": 375,
         "Category": "Merger Model (M&A)",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "Company A has a P\/E of 5x and Company B has a P\/E of 8x. Company A's cost of debt is 5%, its cost of cash interest is 2% and its tax rate is 50%. If Company A purchases Company B using 50% stock, 25% debt and 25% cash, is the deal accretive or dilutive?",
         "Answer": "Here, we must determine the cost of debt and cash for Company A as well as the cost of stock. We already know that Company A's implied cost of equity is 20% and the earnings yield we receive from Company B is 12.5%. To determine the cost of debt, we simply take the given 5% and apply the tax rate because of the tax shield (5% (1 - 50%) = 2.5%). We determine the cost of cash using an identical methodology (2% (1 - 50%) = 1.0%). Next, we need to multiply each of these costs by their weighting. We multiply 50% stock consideration by the 20% cost of equity (10%), 25% debt consideration by the 2.5% after-tax cost of debt (0.625%) and the 25% cash consideration by the 1% after-tax cost of cash (0.25%). We then add each of these rates up (10% + 0.625% + 0.25%) to get 10.875% blended cost. We compare this to the 12.5% and determine that the deal is now accretive. This exercise also shows us that in general, debt and cash are cheaper methods of financing."
        },
        {
         "Question Number": 376,
         "Category": "Merger Model (M&A)",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "Company C has a net income of 200, share price of $6 and has 10 shares outstanding. Company B has a net income of 200, share price of $5 and has 6 shares outstanding. If Company C purchases Company D in an all stock deal at a 20% premium, what is the % change in accretion or dilution?",
         "Answer": "Here, we have to calculate the actual % change in accretion or dilution, so we must flow through the actual calculations to determine the change in pro forma EPS. We must first determine the EPS of Company C by dividing the net income of $200 by the 10 shares outstanding, resulting in an EPS of $20. Next, we determine the purchase price of Company D. We can accomplish this by calculating the market capitalization (share price of $5 x 6 shares outstanding equaling a $30 market cap) and applying the premium of 20% ($30 market cap. x 120% = $36 purchase price). Because this is an all stock deal, we divide the Company D's $36 purchase by Company C's $6 share price. This implies that 6 new shares will be created and given to Company D's shareholders ($36\/$6 = 6). We add this number to Company C's existing share count of 10 to get to a pro forma share total of 16 shares. Next, we get the pro forma earnings by simply adding the net income from both companies: $200 + $200 = $400. We then divide this by the pro forma share of 16 to arise at an EPS of $25 ($400 \/ 16). This is higher than the original EPS of $20 so we know that the deal is accretive. To determine the actual % change, we divide $25 by $20 to determine that the deal is 25% accretive."
        },
        {
         "Question Number": 377,
         "Category": "Merger Model (M&A)",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "Company E has an EBITDA of $200M and Company F has an EBITDA of $100M. Let's say that Company E acquires Company F and realizes $100M in revenue synergies from additional unit sales and $100M from cost synergies. What is the pro forma EBITDA? Assume that the pro forma company has a gross margin of 70%.",
         "Answer": "To determine the pro forma EBITDA, we must add the EBITDA of both companies and also add in the synergies. However, we must note that the revenue synergies of $100M are from additional unit sales and are not a direct addition to EBITDA. These revenue synergies of $100M imply that the pro forma company will be able to drive more unit sales, but they will be subject to COGS. The impact on EBITDA will be $100M in revenue synergies x 70% gross margin, equaling $70M in additional EBITDA. We then add the remaining synergies and calculate pro forma EBITDA ($200M Company E EBITDA + $100M Company F EBITDA + $100M cost savings + $70M from revenue synergies) to arrive at $470M EBITDA for the pro forma company."
        },
        {
         "Question Number": 378,
         "Category": "Merger Model (M&A)",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "Under what circumstances would $100M in revenue synergies be a straight addition to the pro forma company's EBITDA?",
         "Answer": "The synergies would be a full $100M if they were driven by a price increase and not additional unit sales. The logic here is that if you are only increasing the pricing of previous products, you will not generate any additional COGS. This could be possible if an acquisition improved your pricing power or competitive positioning in the market. It is also possible that a service or software company may be able to convert 100% of the revenue synergies into EBITDA even with higher unit sales, though less likely"
        },
        {
         "Question Number": 379,
         "Category": "Merger Model (M&A)",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "How can you calculate break-even synergies in an M&A deal?",
         "Answer": "Break-even synergies can be calculated by reversing the typical accretion\/dilution calculation if the purchase price and the terms of the M&A deal are known. To accomplish this, one would create a pro forma income statement and make the ordinary adjustments: consolidating earnings and income statement items, increasing interest expense for any debt, decreasing interest revenue for any lost cash, and increasing the number of shares based off of issued equity. After making these adjustments, one could determine how much EPS was lost and how much synergies are required to offset the amount."
        },
        {
         "Question Number": 380,
         "Category": "Merger Model (M&A)",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "How much debt could a company raise for a merger or acquisition?",
         "Answer": "This question is similar to asking how much debt a standalone company would be able to raise. You would most commonly assess a firm's ability to raise debt based on its interest coverage ratio, its leverage ratio and its credit rating. The key difference in a merger or acquisition scenario is that you would have to look at the combined company's EBITDA figures for these calculations rather than standalone EPS."
        },
        {
         "Question Number": 381,
         "Category": "Merger Model (M&A)",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "What is contribution analysis?",
         "Answer": "Contribution analysis is an evaluation of how much each company in a merger contributes to the pro forma financials. By analyzing the companies' pre-existing EBITDA, revenue, and assets, one can understand the specific percentage that each player is adding to the overall pie. For a simple example, if Company A had $600M EBITDA and Company B had $400M EBITDA, then contribution analysis would determine that EBITDA was split 60 - 40. This tool can be useful in determining voting rights, tax implications, and related deal terms. It can also impact pricing and influence the stock exchange ratio in a stock deal."
        },
        {
         "Question Number": 382,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "What is the interest tax shield?",
         "Answer": "The interest tax shield is a phenomenon that makes debt a cheaper vehicle of capital than equity. Interest is tax-deductible, as it appears higher than the tax line on the income statement and is treated as a cash expense. Mechanically, the greater the amount of expenses that a company has, the less tax it has to pay, which provides financial benefits for the company. The interest tax shield is one of the reasons that debt is such an attractive financing vehicle and is also the reason we calculate after-tax cost of debt for the WACC. The PV of a tax shield is Debt Amount x Tax Rate."
        },
        {
         "Question Number": 383,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "What is leverage and how do its mechanics amplify returns in an LBO?",
         "Answer": "Leverage and the act of \"levering up a company\" refers to taking on debt or other forms of borrowed capital in order to increase a company's returns. LBO's use leverage to improve returns for the investor, which is possible because of three key functions of debt: ● Taking on debt gives you access to other people's capital that you would otherwise not be able to use. A greater resource pool allows you to purchase a greater quantity of productive assets while reducing the up-front cash investment ● Using the company or asset's cash flows to repay debt principal produces a better return than just keeping the cash. This is partially a result of the tax shield that is applied to interest, which is a function of how governments and regulators treat debt. Similarly, allowing interest to be tax-deductible makes debt a cheaper source of capital than equity ● Typically a business experiences growth in EBITDA so the exit price is higher than the entry price even at the same multiple. Since the sponsor typically pays back a lot of the debt, a much larger portion of the exit price belongs to the sponsor, creating high returns. For example, entering and exit at an EV of $100, a sponsor may only invest $25 in cash, but receive $80 upon exit, simply by paying down debt"
        },
        {
         "Question Number": 384,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "What are the three ways investors can retrieve funds or capital in an LBO?",
         "Answer": "There are three major ways an LBO investor can retrieve cash or funds from an LBO investment: ● Exit: The sale of the investment at the end of the holding period is the largest inflow of capital for the sponsor as all gains are realized at this point ● Dividend Recapitalization: A dividend recapitalization is when the LBO candidate pays out a special dividend to the sponsors, funded through additional debt. This increases leverage of the company and typically increases IRR because of the time value of money ● Dividends. Yes, although this is very similar to a dividend recapitalization, it is important to recognize these two things as distinctly different actions"
        },
        {
         "Question Number": 385,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "What is the internal rate of return (IRR)?",
         "Answer": "Academically speaking, the IRR is the rate at which the present value of an asset's cash inflows and outflows is equal to 0. Practically speaking, IRR is the compound rate you can expect to earn on an investment into an asset. A lower initial investment means that the cash outflow is lower, which would increase the IRR. Higher returns in the future means that the cash inflows are higher, which would also increase the IRR. If there is only one initial cash outflow and one final inflow, the IRR is simply the compound annual growth rate on the investment. This can be used to sometimes estimate the IRR of projects."
        },
        {
         "Question Number": 386,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "What actions or strategies can you take to improve the IRR in an LBO?",
         "Answer": "IRR (internal rate of return) is one of the most used metrics to determine the success of an LBO. There are several actions that a firm can take to improve the IRR, which include: ● Lowering the initial purchase price of the company, which reduces the cash investment ● Improving the exit multiple, which increases the funds received ● Increasing leverage, which reduces the amount of upfront investment required ● Conducting a dividend recapitalization ● Exiting the investment earlier ● Accelerating the company's growth, which should increase EBITDA and the exit multiple ● Improving margins, which has the same effects as faster growth ● Realizing synergies with other portfolio companies or rolling in new acquisitions"
        },
        {
         "Question Number": 387,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "What are factors that would make an LBO more difficult to perform on a private company?",
         "Answer": "1) First, the financials of a private company are much more opaque than public companies. Private companies are not legally required to publish audited financials, which can make it much more difficult to gauge the health and attractiveness of a company. These financials would be necessary to determine the potential returns a firm could generate and the target's ability to service debt. 2) Second, the absence of floating shares on public exchanges can make it difficult for a firm to acquire a controlling stake in the company. Private equity firms that conduct LBO's can only do so because they hold a controlling stake in the company and can force the target to assume a greater quantity of debt. Without direct access to these shares, the private equity firm would have to directly solicit shareholders. 3) Finally, obtaining debt can be difficult because of a lack of information, history, and credit rating. Public debt markets are difficult to access for private companies because of the above and also because they simply don't have the scale for a major issuance."
        },
        {
         "Question Number": 388,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "What is the rule of 72? What is the rule of 114?",
         "Answer": "The rule of 72 and 114 are two mental math tricks you can use to determine the IRR of an LBO transaction. Whenever you are asked to derive an actual number for an IRR, you can typically use these rules. The rule of 72 stipulates that the time it takes to double an investment is 72 divided by that time period. Although not 100% accurate, it will suffice in an interview setting. For example, the rate you get if an investment doubles in 3 years is 24%; 4 years is 18%; 5 years is 14.4%, etc. The rule of 114 stipulates that the time it takes to triple an investment is 114 divided by that time period. For example, the rate you get if an investment triples in 3 years is 38%; 4 years is 28.5%, 5 years is 25%, etc."
        },
        {
         "Question Number": 389,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "If you purchased a company for $100M and sold it for $200M after 5 years, what was your IRR?",
         "Answer": "Whenever asked a question about IRR, you must first clarify how much debt the company had at the beginning of the holding period and how much debt it had at the end of the period. The company's debt at the start of the period reduces the amount of initial investment and what the cash outflows are, while the company's debt at the end of the period must be paid down before returns can be realized. Now armed with the rule of 72, we can recognize that this is simply a doubling of an investment over 5 years. Assuming that the company had no debt throughout the entire investment, the IRR would be approximately 14.4% (actually closer to 15%)."
        },
        {
         "Question Number": 390,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "Why would a revolver have the lowest interest rate?",
         "Answer": "A revolver is the cheapest form of debt in an LBO. A revolver acts similarly to a credit card, as it is drawn upon if the company has cash shortfalls and is also the first thing paid down. Revolver interest rates are the lowest because they are pledged against collateral, which reduces its riskiness. Concurrently, revolvers have the lowest interest rate because commercial banks and lenders treat it as a sweetener in a deal and compete for a company's business based on how low the rate is."
        },
        {
         "Question Number": 391,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "Why would an LBO not be relevant for the metals and mining industry?",
         "Answer": "An ideal LBO candidate has dependable cash flows, low capital expenditures and is not exposed to commodity risk. The metals and mining industry embodies the opposite of this; high initial investments, continual capital expenditures, and direct exposure to unpredictable commodity fluctuations. During periods of weak commodity prices, senior miners are forced to sell their assets with high cash costs, while junior miners do not have enough money to fuel their capital expenditures. Accordingly, mergers are more common in the metals and mining industry."
        },
        {
         "Question Number": 392,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "If a company could service debt up to 7X EBITDA, why would it only take debt up to 5X EBITDA?",
         "Answer": "Raising the maximum amount of debt is not always in the best interest of a company. Some of the reasons that make additional debt unattractive include, but are not limited to: ● It may be a bad secular debt market and it may be hard to raise capital right now. Interest rates could be comparatively higher than the future, which might make it better to defer raising debt ● Raising more debt would hurt cash flows, which increases the overall company risk and compromises its profitability ● Additional debt may impact the company's perception among potential investors or credit agencies, potentially leading to a reduction to the company's credit rating"
        },
        {
         "Question Number": 393,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "You have the option of either receiving $200M now or $40M each year for 5 years. What IRR would you need to make the value of these two options equal?",
         "Answer": "This is a trick question, which is tipped off slightly as it is very difficult to mentally calculate an IRR to gauge two investment options. Here, we remember that IRR makes all future cash flows equal 0 when discounted to the present value. If any of the five future $40M payments are discounted, the sum of their present value would be less than $200M. If any of the five future $40M payments are appreciated, the sum of their present value would be greater than $200M. The only mathematical possibility is if the IRR is 0."
        },
        {
         "Question Number": 394,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "There are two companies with identical growth prospects, margins, business models, etc. The only difference is that one company has 50% debt-to-total capitalization, while the other has 0%. If you were a PE firm and were going to bring the company's debt-to-total capitalization to 70%, which investment would yield a higher IRR (assuming that the equity purchase price is the same)?",
         "Answer": "First, we make the assumption that the ability to service debt is the same for both companies, so the interest rates, covenants and debt tolerance for both firms is identical. With that out of the way, we recognize that the two company's initial debt-to-total capitalization is irrelevant from a returns basis. It does not matter if you are the firm who raised the debt or if the debt was refinanced from before, the IRR and returns will be the same mathematically. At 70% debt-to-total capitalization, the EV of the two companies would be the same, implying that the IRR would be the same as well. However, this assumes that the purchase EV is the same in both situations. This is not entirely correct because sponsors typically have to pay a premium on equity (control premium), which does not apply to debt. In this case, the company with the higher debt will result in a higher IRR because it will have a lower purchase price."
        },
        {
         "Question Number": 395,
         "Category": "Leveraged Buyouts (LBO)",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "Company XYZ has $50M EBITDA, a 6X EBITDA multiple, $200M in bank debt and $200M in high yield debt. What is the value of the debt? What dollar value is the debt trading at?",
         "Answer": "First, we can determine that the EV of the company is $300M ($50M EBITDA x 6X EBITDA multiple). We can also determine that the total debt of the company is $400M ($200M bank debt + $200M high yield debt). It is clear at this point that the company is undergoing bankruptcy. Based on this, market capitalization and cash are $0 so we allocate the EV to the different tranches of debt by their seniority. We know that bank debt has a higher priority than high yield debt so we allocate $200M from the EV to it. The remaining $100M in EV ($300M EV - $200M bank debt) represents the value of the high yield debt. The dollar value is $0.50 because it is trading at half of its full value ($100M \/ $200M)"
        },
        {
         "Question Number": 396,
         "Category": "Brain Teasers\/Misc.",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "What is the market cap for a company that has... $2bn in assets 3x Debt to Equity 2x P \/ BV...",
         "Answer": "Answer: 1bn A = L + SE If A = 2bn, we know L + SE = 2bn since A = L + SE. Thus, since Debt is 3x Equity, we know that Liabilities are 1.5bn and Equity is .5bn or 500mm (add up to 2bn). BV (Book Value) is essentially shareholder's equity, and since the P \/ BV is 2x, we know that the market cap of the company is 1bn (2 * 500mm)."
        },
        {
         "Question Number": 397,
         "Category": "Brain Teasers\/Misc.",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "Company A has a market capitalization of $6B and purchases Company B at a market capitalization of $3B. If Company A owns 75% of the pro forma company, how much cash did it use in the transaction?",
         "Answer": "The first clue is that Company A's shareholders own 75% of the pro forma company. Because all of the shares of Company B disappear after the transaction closes, the implied market capitalization of the pro forma company is equal to $8B ($6B \/ 75%). The pro forma value of the company is equal to $9B (Company A $6B + Company B $3B), so the difference of $1B must be cash. This transaction says that Company B shareholders own $2B of stock in the pro forma company and were paid $1B in cash in exchange for their old shares worth $3B."
        },
        {
         "Question Number": 398,
         "Category": "Brain Teasers\/Misc.",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "Would you rather us hand you $1,000 today or $100 every year into perpetuity?",
         "Answer": "Depends on the discount rate (r). PV of Perpetuity = X \/ r If r < 10%, would rather take 100 every year. If r > 10%, would rather take $1,000 today."
        },
        {
         "Question Number": 399,
         "Category": "Brain Teasers\/Misc.",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "What is the Beta of a gambling ring?",
         "Answer": "0 - no correlation to market"
        },
        {
         "Question Number": 400,
         "Category": "Brain Teasers\/Misc.",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "2 ways to return capital to shareholders",
         "Answer": "1) Dividends → taxed twice, shareholders have to pay taxes immediately 2) Company buys back shares → signal to shareholders that the company thinks it is undervalued, and shareholders don't need to pay taxes right away (capital gains)"
        },
        {
         "Question Number": 401,
         "Category": "Brain Teasers\/Misc.",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "What is the P\/E of cash?",
         "Answer": "P\/E represents price-to-earnings and in principle can be applied to the vehicle of cash. This concept is best understood using a price of $1 and determining how much you could earn off that $1. At the minimum, you would be able to invest it in risk-free assets, which would ordinarily yield between 1-3%. If the price is $1 and the earnings are between $0.01 and $0.03, the P\/E could potentially range between 33x to 100x."
        },
        {
         "Question Number": 402,
         "Category": "Brain Teasers\/Misc.",
         "Topic": "Outside the Guide",
         "Difficulty": "Advanced",
         "Question": "5 things a company can do with cash?",
         "Answer": "1) Finance future project \/ CapEx 2) Pay back debt 3) Acquisitions 4) Stock buy-backs 5) Issue cash dividends"
        }
       ];

