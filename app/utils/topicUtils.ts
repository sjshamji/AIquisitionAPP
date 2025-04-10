import { Topic } from '../data/topics';

// Map topic IDs to their corresponding categories in the questions data
export const topicToCategoryMap: Record<string, string> = {
    'Accounting': 'Accounting',
    'Enterprise & Equity Value': 'Enterprise & Equity Value',
    'Valuation': 'Valuation',
    'DCF': 'DCF',
    'Merger Model (M&A)': 'Merger Model (M&A)',
    'Leveraged Buyouts (LBO)': 'Leveraged Buyouts (LBO)',
    'Brain Teasers/Misc.': 'Brain Teasers/Misc.'
};

// Get the category from the topic ID
export function getCategoryFromTopicId(topicId: string): string {
    return topicToCategoryMap[topicId] || topicId;
}

// Get the topic ID from the category
export function getTopicIdFromCategory(category: string): string {
    const entry = Object.entries(topicToCategoryMap).find(([_, value]) => value === category);
    return entry ? entry[0] : category;
}

// Get the topic name from the topic ID
export function getTopicNameFromId(topicId: string, topics: Topic[]): string {
    const topic = topics.find(t => t.id === topicId);
    return topic ? topic.name : topicId;
} 