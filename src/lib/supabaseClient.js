import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseUrl = Constants.manifest.extra.supabaseUrl;
const supabaseAnonKey = Constants.manifest.extra.supabaseAnonKey;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
