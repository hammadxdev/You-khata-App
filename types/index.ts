// Customer type
export interface Customer {
  id: string;
  name: string;
  initials: string;
  phoneNumber: string;
  amount: number;
  toReceive: boolean;
  createdAt: number;
  profileId: string; // Associate customer with a profile
}

// Transaction type
export interface Transaction {
  id: string;
  customerId: string;
  amount: number;
  isReceived: boolean; // true if customer gave money (Maine Liye), false if we gave money (Maine Diye)
  date: number;
  notes?: string;
  balance: number;
  profileId: string; // Associate transaction with a profile
}

// Batwa Transaction type
export interface BatwaTransaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  timestamp: number;
  notes: string;
  profileId: string; // Associate batwa transaction with a profile
}

// User profile type
export interface UserProfile {
  id: string;
  name: string;
  phoneNumber?: string;
  profilePicture?: string;
}

// Profile type
export interface Profile {
  id: string;
  name: string;
  description?: string;
  createdAt: number;
}

// Navigation types
export type RootStackParamList = {
  Home: undefined;
  CustomerDetail: { customerId: string };
  AddCustomer: undefined;
  AddTransaction: { customerId: string };
  CustomerReports: { customerId: string };
  PrivacyPolicy: undefined;
};

// Theme types
export interface Theme {
  text: string;
  background: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  colors: Theme;
  toggleTheme: () => void;
}

// Component prop types
export interface CustomerItemProps {
  customer: Customer;
  onPress: () => void;
}

export interface TransactionItemProps {
  transaction: Transaction;
  onDelete?: (transactionId: string) => void;
}

export interface BatwaTransactionItemProps {
  transaction: BatwaTransaction;
  onDelete?: (transactionId: string) => void;
}