import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        const { type, data } = await req.json()
        console.log('Processing notification:', { type, data })

        switch (type) {
            case 'wager_created':
                await handleWagerCreated(supabaseClient, data)
                break
            case 'wager_accepted':
                await handleWagerAccepted(supabaseClient, data)
                break
            case 'wager_settled':
                await handleWagerSettled(supabaseClient, data)
                break
            case 'wager_expired':
                await handleWagerExpired(supabaseClient, data)
                break
            default:
                throw new Error(`Unknown notification type: ${type}`)
        }

        return new Response(
            JSON.stringify({ success: true }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200
            }
        )
    } catch (error) {
        console.error('Error processing notification:', error)
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400
            }
        )
    }
})

async function handleWagerCreated(supabase: any, data: any) {
    console.log('Creating wager notification:', data)
    const { wager_id, creator_address, sol_amount, wager_type } = data

    try {
        const { data: result, error } = await supabase
            .from('notifications')
            .insert({
                user_address: creator_address,
                type: 'wager_created',
                title: 'Wager Created Successfully',
                message: `Your ${sol_amount} SOL ${wager_type} wager has been created and is now live!`,
                data: {
                    wager_id,
                    amount: sol_amount,
                    type: wager_type
                }
            })

        if (error) {
            console.error('Error creating wager notification:', error)
            throw error
        }

        console.log('Wager notification created successfully:', result)
    } catch (error) {
        console.error('Failed to create wager notification:', error)
        throw error
    }
}

async function handleWagerAccepted(supabase: any, data: any) {
    console.log('Creating wager accepted notifications:', data)
    const { wager_id, creator_address, opponent_address, sol_amount } = data

    try {
        // Notify creator that their wager was accepted
        const { data: creatorResult, error: creatorError } = await supabase
            .from('notifications')
            .insert({
                user_address: creator_address,
                type: 'wager_accepted',
                title: 'Wager Accepted!',
                message: `Your ${sol_amount} SOL wager has been accepted by ${opponent_address.slice(0, 8)}...`,
                data: {
                    wager_id,
                    opponent: opponent_address,
                    amount: sol_amount
                }
            })

        if (creatorError) {
            console.error('Error creating creator notification:', creatorError)
            throw creatorError
        }

        console.log('Creator notification created:', creatorResult)

        // Notify opponent that they accepted a wager
        const { data: opponentResult, error: opponentError } = await supabase
            .from('notifications')
            .insert({
                user_address: opponent_address,
                type: 'wager_accepted',
                title: 'Wager Joined!',
                message: `You've successfully joined a ${sol_amount} SOL wager against ${creator_address.slice(0, 8)}...`,
                data: {
                    wager_id,
                    opponent: creator_address,
                    amount: sol_amount
                }
            })

        if (opponentError) {
            console.error('Error creating opponent notification:', opponentError)
            throw opponentError
        }

        console.log('Opponent notification created:', opponentResult)
    } catch (error) {
        console.error('Failed to create wager accepted notifications:', error)
        throw error
    }
}

async function handleWagerSettled(supabase: any, data: any) {
    console.log('Creating wager settled notifications:', data)
    const { wager_id, creator_address, opponent_address, winner_address, sol_amount, winnings } = data

    try {
        // Notify winner
        const { data: winnerResult, error: winnerError } = await supabase
            .from('notifications')
            .insert({
                user_address: winner_address,
                type: 'wager_won',
                title: '🎉 You Won!',
                message: `Congratulations! You won ${winnings} SOL from your ${sol_amount} SOL wager!`,
                data: {
                    wager_id,
                    amount: sol_amount,
                    winnings
                }
            })

        if (winnerError) {
            console.error('Error creating winner notification:', winnerError)
            throw winnerError
        }

        console.log('Winner notification created:', winnerResult)

        // Notify loser
        const loser_address = winner_address === creator_address ? opponent_address : creator_address
        const { data: loserResult, error: loserError } = await supabase
            .from('notifications')
            .insert({
                user_address: loser_address,
                type: 'wager_lost',
                title: 'Wager Lost',
                message: `Your ${sol_amount} SOL wager didn't go your way this time. Better luck next time!`,
                data: {
                    wager_id,
                    amount: sol_amount
                }
            })

        if (loserError) {
            console.error('Error creating loser notification:', loserError)
            throw loserError
        }

        console.log('Loser notification created:', loserResult)
    } catch (error) {
        console.error('Failed to create wager settled notifications:', error)
        throw error
    }
}

async function handleWagerExpired(supabase: any, data: any) {
    console.log('Creating wager expired notifications:', data)
    const { wager_id, creator_address, opponent_address, sol_amount } = data

    try {
        // Notify creator
        const { data: creatorResult, error: creatorError } = await supabase
            .from('notifications')
            .insert({
                user_address: creator_address,
                type: 'wager_expired',
                title: 'Wager Expired',
                message: `Your ${sol_amount} SOL wager has expired and been automatically cancelled.`,
                data: {
                    wager_id,
                    amount: sol_amount
                }
            })

        if (creatorError) {
            console.error('Error creating creator expired notification:', creatorError)
            throw creatorError
        }

        console.log('Creator expired notification created:', creatorResult)

        // Notify opponent if there was one
        if (opponent_address) {
            const { data: opponentResult, error: opponentError } = await supabase
                .from('notifications')
                .insert({
                    user_address: opponent_address,
                    type: 'wager_expired',
                    title: 'Wager Expired',
                    message: `A ${sol_amount} SOL wager you were participating in has expired.`,
                    data: {
                        wager_id,
                        amount: sol_amount
                    }
                })

            if (opponentError) {
                console.error('Error creating opponent expired notification:', opponentError)
                throw opponentError
            }

            console.log('Opponent expired notification created:', opponentResult)
        }
    } catch (error) {
        console.error('Failed to create wager expired notifications:', error)
        throw error
    }
} 