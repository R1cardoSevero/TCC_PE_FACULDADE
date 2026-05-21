import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://maeejjtoydpvkhjacujr.supabase.co'
const supabaseKey = 'sb_publishable_pnSjc5ZLjKniEzIJ_qVGnA_xlUBuml6'

export const supabase = createClient(supabaseUrl, supabaseKey)