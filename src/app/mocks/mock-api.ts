export interface MockRequest {
    status: string;
    code: string;
    count: number;
    data: object;
}

export const REQUEST: MockRequest[] = [
    {
        'status': 'success',
        'code': '200',
        'count': 79,
        'data': [
            {
                'id': 1,
                'title': '',
                'subtitle': '',
                'content': '',
                'media': '',
                'waypoint': 'start',
                'background': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/images/home-bg-light.jpg',
                'inputs': [
                    {
                        'type': 'start'
                    },
                    {
                        'label': 'Begin Interactive Coaching Session',
                        'type': 'button',
                        'name': 'begin',
                        'target': 100,
                    }
                ]
            },
            {
                'id': 100,
                'title': 'Welcome',
                'subtitle': 'Is Your Sound On?  We\'ll need it for our session together.',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/01_sound_check_welcome.mp3',
                'inputs': [
                    {
                        'label': 'Yes, it is',
                        'type': 'button',
                        'value': 'Yes',
                        'name': 'yes',
                        'target': 4
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'It\'s not',
                        'type': 'button',
                        'name': 'no',
                        'target': 3
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'Test my sound',
                        'type': 'button',
                        'name': 'test',
                        'target': 2
                    }
                ]
            },
            {
                'id': 2,
                'title': '',
                'subtitle': 'Can you hear me?',
                'content': '<p>Testing 1, 2, 3...</p>',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/02_sound_check_can_you_hear_me.mp3',
                'inputs': [
                    {
                        'label': 'Yes, I can',
                        'type': 'button',
                        'name': 'yes',
                        'target': 4
                    },
                    {
                        'label': 'Is this really necessary?',
                        'type': 'button',
                        'name': 'no',
                        'target': 3
                    }
                ]
            },
            {
                'id': 3,
                'content': '<p>Without sound, the conversational coaching session I\'d like to lead you through will get really confusing. Please turn your sound on to continue. Closed Captioning is coming soon!</p>',
                'inputs': [
                    {
                        'label': 'Understood.  Let\'s get started!',
                        'type': 'button',
                        'name': 'yes',
                        'target': 4
                    }
                ]
            },
            {
                'id': 4,
                'title': '',
                'subtitle': '',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/04_malcom_intro.mp4',
                'redirect': 5
            },
            {
                'id': 5,
                'title': 'Influence On Your Health',
                'subtitle': 'How much control do you think you have over your health?',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/03_first_how_much_control.mp3',
                'inputs': [
                    {
                        'label': 'I have very little to no control',
                        'type': 'button',
                        'name': 'one',
                        'target': 6
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'My health controls me a bit more than I control it',
                        'type': 'button',
                        'name': 'two',
                        'target': 6
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'About half of my health is within my control.',
                        'type': 'button',
                        'name': 'three',
                        'target': 6
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'I am much more in control of my health than it is of me.',
                        'type': 'button',
                        'name': 'four',
                        'target': 6
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'Absolutely!  I\'m in complete control.',
                        'type': 'button',
                        'name': 'five',
                        'target': 6
                    }
                ]
            },
            {
                'id': 6,
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/04_got_it.mp3',
                'redirect': 7
            },
            {
                'id': 7,
                'title': 'Sleep',
                'subtitle': 'How many hours do you sleep each night?',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/05_now_thinking_back.mp3',
                'inputs': [
                    {
                        'label': 'Average amount of sleep',
                        'type': 'select',
                        'name': 'sleep',
                        'options': [
                            {
                                'values': [1, 12]
                            }
                        ]
                    },
                    {
                        'label': 'Continue',
                        'type': 'button',
                        'name': 'continue',
                        'target': 8
                    }
                ]
            },
            {
                'id': 8,
                'title': '',
                'subtitle': 'How do you feel most mornings?',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/06_how_did_you_usually_feel.mp3',
                'inputs': [
                    {
                        'label': 'Pretty Tired',
                        'type': 'button',
                        'name': 'tired',
                        'target': 9
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'Mostly Fine',
                        'type': 'button',
                        'name': 'fine',
                        'target': 10
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'Refreshed and Energized!',
                        'type': 'button',
                        'name': 'refreshed',
                        'target': 10
                    }
                ]
            },
            {
                'id': 9,
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/07_im_guessing_coffee.mp3',
                'redirect': 11
            },
            {
                'id': 10,
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/08_waking_up_great.mp3',
                'redirect': 11
            },
            {
                'id': 11,
                'title': 'Physical Activity',
                'subtitle': 'What does a normal workday look like?',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/09_ok_lets_look_physical_activity.mp3',
                'inputs': [
                    {
                        'label': 'Mostly Sitting',
                        'type': 'button',
                        'name': 'sitting',
                        'target': 12
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'A mix of sitting and walking',
                        'type': 'button',
                        'name': 'mixed',
                        'target': 13
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'I\'m on my feet and active all day',
                        'type': 'button',
                        'name': 'active',
                        'target': 13
                    }
                ]
            },
            {
                'id': 12,
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/10_mostly_sitting_ok.mp3',
                'redirect': 14
            },
            {
                'id': 13,
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/24-09_mix_of_sitting_ok.mp3',
                'redirect': 14
            },
            {
                'id': 14,
                'title': '',
                'subtitle': 'In the last year, how active have you been outside of work?',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/11_in_the_last_year_how_active.mp3',
                'inputs': [
                    {
                        'label': 'I exercised a handful of times',
                        'type': 'button',
                        'name': 'sitting',
                        'target': 15
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'I exercised, but it was far from a regular schedule',
                        'type': 'button',
                        'name': 'mixed',
                        'target': 15
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'There were good months and there were bad months',
                        'type': 'button',
                        'name': 'active',
                        'target': 15
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'I exercised regularly',
                        'type': 'button',
                        'name': 'regularly',
                        'target': 15
                    }
                ]
            },
            {
                'id': 15,
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/26-11_ok.mp3',
                'redirect': 19
            },
            {
                'id': 17,
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/13_schedule_great.mp3',
                'redirect': 19
            },
            {
                'id': 18,
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/14_schedule_no_problem.mp3',
                'redirect': 19
            },
            {
                'id': 19,
                'title': 'Nutrition',
                'subtitle': 'Thinking back on the last week, on average, how many servings of vegetables did you eat every day?',
                'content': '<p>As an example, if you didn\'t eat veggies with breakfast but normally had veggies with lunch and dinner put down 2.</p>',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/75_thinking_back_to_last_week_veggies.mp3',
                'inputs': [
                    {
                        'label': 'Servings per day',
                        'type': 'select',
                        'name': 'servings',
                        'options': [
                            {
                                'values': [0, 6]
                            }
                        ]
                    },
                    {
                        'label': 'Submit',
                        'type': 'button',
                        'name': 'submit',
                        'target': 20
                    }
                ]
            },
            {
                'id': 20,
                'title': '',
                'subtitle': 'On average, how many meals per day included over-processed or fried foods?',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/76_over_processed.mp3',
                'inputs': [
                    {
                        'label': 'Meals per day',
                        'type': 'select',
                        'name': 'servings',
                        'options': [
                            {
                                'values': [0, 6]
                            }
                        ]
                    },
                    {
                        'label': 'Submit',
                        'type': 'button',
                        'name': 'submit',
                        'target': 22
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'Define "over-processed food" for me.',
                        'type': 'button',
                        'name': 'defined-processed',
                        'target': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/77_define_over_processed.mp3'
                    }
                ]
            },
            {
                'id': 22,
                'title': 'Your Basic Info',
                'subtitle': '',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/17_now_in_just_a_moment.mp3',
                'inputs': [
                    {
                        'label': 'Gender',
                        'type': 'radio',
                        'name': 'gender',
                        'options': [
                            {
                                'label': 'Male'
                            },
                            {
                                'label': 'Female'
                            }
                        ]
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'Height (Feet)',
                        'type': 'text',
                        'name': 'height-feet',
                        'format': 'number'
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'Inches',
                        'type': 'text',
                        'name': 'height-inches',
                        'format': 'number'
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'Weight (Lbs)',
                        'type': 'text',
                        'name': 'weight',
                        'format': 'number'
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'Date of Birth',
                        'type': 'text',
                        'name': 'date-of-birth',
                        'format': 'date'
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'Submit',
                        'type': 'button',
                        'name': 'submit',
                        'target': 24
                    },
                    {
                        'label': 'Why do you ask?',
                        'type': 'button',
                        'name': 'why-ask',
                        'target': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/19_i_only_ask_because.mp3'
                    }
                ]
            },
            {
                'id': 24,
                'title': '',
                'subtitle': 'Save your progress?',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/20_email_you_a_link.mp3',
                'inputs': [
                    {
                        'label': 'Your email address',
                        'type': 'text',
                        'name': 'email',
                        'format': 'email'
                    },
                    {
                        'label': 'Submit',
                        'type': 'button',
                        'name': 'submit',
                        'target': 25
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'No thanks, I\'ll start all over again later',
                        'type': 'button',
                        'name': 'no-thanks',
                        'target': 26
                    }
                ]
            },
            {
                'id': 25,
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/21_email_submit_got_it.mp3',
                'redirect': 27
            },
            {
                'id': 26,
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/22_email_no_thanks_not_a_problem.mp3',
                'redirect': 27
            },
            {
                'id': 27,
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/23_heres_the_dashboard.mp3',
                'background': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/images/dashboard-bg-dark.jpg',
                'waypoint': 25,
                'theme': 'dark',
                'inputs': [
                    {
                        'type': 'dashboard',
                        'options': [
                            {
                                'iconPath': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/images/nutrition.svg',
                                'color': '#fa1332',
                                'label': 'Nutrition',
                                'target': 27,
                                'recommended': false
                            },
                            {
                                'iconPath': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/images/exercise.svg',
                                'color': '#80c320',
                                'label': 'Physical Activity',
                                'target': 28,
                                'recommended': true
                            },
                            {
                                'iconPath': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/images/sleep.svg',
                                'color': '#fc9802',
                                'label': 'Sleep',
                                'target': 27,
                                'recommended': false
                            },
                            {
                                'iconPath': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/images/mindfulness.svg',
                                'color': '#3b74ae',
                                'label': 'Mindfulness',
                                'target': 27,
                                'recommended': false
                            },
                            {
                                'iconPath': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/images/social.svg',
                                'color': '#f15b29',
                                'label': 'Social Connection',
                                'target': 27,
                                'recommended': false
                            }
                        ],
                        'feed': [
                            {
                                'title': 'InBody Scan Appointment',
                                'date': 1540458000,
                                'location': 'Cleveland Clinic West Conference Room',
                                'color': '#792b89'
                            },
                            {
                                'title': 'Rock Climbing',
                                'date': 1540890000,
                                'location': 'Steepworld: 1230 S. 32st Street West',
                                'color': '#80c320'
                            }
                        ]
                    }
                ],
                'attributes': {
                    'class': 'extended'
                }
            },
            {
                'id': 28,
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/28_emotional_health.mp4',
                'redirect': 29
            },
            {
                'id': 29,
                'title': 'Exercise',
                'subtitle': 'How many minutes of exercise did you average each week last month?',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/27_ok_first_question.mp3',
                'inputs': [
                    {
                        'label': 'Approximate number of minutes',
                        'type': 'text',
                        'name': 'number-minutes',
                        'format': 'number'
                    },
                    {
                        'label': 'Continue',
                        'type': 'button',
                        'name': 'submit',
                        'target': 30
                    }
                ]
            },
            {
                'id': 30,
                'title': '',
                'subtitle': '',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/33_how_do_you_feel_about_that_amount.mp3',
                'inputs': [
                    {
                        'label': 'How do you feel about that?',
                        'type': 'radio',
                        'name': 'howDoYouFeel',
                        'options': [
                            {
                                'label': 'Proud',
                                'target': 37
                            },
                            {
                                'label': 'Excited',
                                'target': 37
                            },
                            {
                                'label': 'Happy',
                                'target': 37
                            },
                            {
                                'label': 'Energized',
                                'target': 37
                            },
                            {
                                'label': 'Content',
                                'target': 37
                            },
                            {
                                'label': 'Frustrated',
                                'target': 101
                            },
                            {
                                'label': 'Self-Critical',
                                'target': 101
                            },
                            {
                                'label': 'Self-Doubt',
                                'target': 101
                            },
                            {
                                'label': 'Angry at myself',
                                'target': 101
                            },
                            {
                                'label': 'Pathetic',
                                'target': 101
                            },
                            {
                                'label': 'Overwhelmed',
                                'target': 101
                            },
                            {
                                'label': 'Apathetic',
                                'target': 101
                            }
                        ]
                    },
                    {
                        'label': 'Submit',
                        'type': 'button',
                        'name': 'submit',
                        'target': 'howDoYouFeel'
                    }
                ]
            },
            {
                'id': 101,
                'title': 'Reframing',
                'subtitle': 'Try reframing your thoughts?',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/78_negative_emotion_associated_with_exercise.mp3',
                'inputs': [
                    {
                        'label': 'Sounds good',
                        'type': 'button',
                        'name': 'submit',
                        'target': 102
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'Nope, let\'s move on',
                        'type': 'button',
                        'name': 'submit',
                        'target': 37
                    }
                ]
            },
            {
                'id': 102,
                'title': '',
                'subtitle': '',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/79_CBT_animation.mp4',
                'redirect': 31
            },
            {
                'id': 31,
                'title': 'Your Story',
                'subtitle': 'Thoughts Connected to Your Emotion',
                'content': '<p>Example: <strong>Emotion</strong> - Frustrated.  <strong>Automatic thought</strong> - I don\'t have time to exercise.</p>',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/80_connected_story.mp3',
                'inputs': [
                    {
                        'label': 'Automatic Thoughts',
                        'type': 'textarea',
                        'name': 'automaticThoughts',
                        'limit': 250
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'Continue',
                        'type': 'button',
                        'name': 'submit',
                        'target': 32
                    }
                ]
            },
            {
                'id': 32,
                'title': 'Your Story Gap',
                'subtitle': 'Choose one descriptor',
                'content': '<p>Example: <strong>Emotion</strong> - Frustrated.  <strong>Automatic thought</strong> - I don\'t have time to exercise.  <strong>Descriptor</strong> - All or Nothing Thinking</p>',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/81_story_creating_the_emotion.mp3',
                'inputs': [
                    {
                        'type': 'comparison',
                        'compared': [
                            'automaticThoughts'
                        ]
                    },
                    {
                        'label': 'Cognitive Distortion',
                        'type': 'radio',
                        'name': 'cognitiveDistortion',
                        'options': [
                            {
                                'label': 'Catastrophizing -  blowing circumstances out of proportion.  Making problems larger than life.'
                            },
                            {
                                'label': 'All-or-Nothing Thinking - Seeing things as either fantastic or awful, you are either perfect or a total failure.'
                            },
                            {
                                'label': 'Overgeneralization - Taking one instance and generalizing it into an overall pattern.'
                            },
                            {
                                'label': 'Labeling - Making global statements about oneself and others.'
                            },
                            {
                                'label': 'Disqualifying the Positive - Acknowledging positive experiences but reject them instead of embracing them.'
                            },
                            {
                                'label': 'Mind Reading - Believing that we know what other people are thinking.'
                            },
                            {
                                'label': 'Fortune Telling - Making conclusions and predictions based on little to no evidence and holding them as truth. '
                            },
                            {
                                'label': 'Magnification or Minimization - Exaggerating the importance or meaning of things or minimizing the importance or meaning of things.'
                            },
                            {
                                'label': 'Emotional Reasoning - Acceptance of one’s emotions as fact. It can be described as “I feel it, so it must be true.” '
                            },
                            {
                                'label': 'Shoulding -  Unrealistic demands on ourselves, and on others.'
                            }
                        ]
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'Continue',
                        'type': 'button',
                        'name': 'submit',
                        'target': 33
                    }
                ]
            },
            {
                'id': 33,
                'title': '',
                'subtitle': '',
                'content': '<p>Example: <strong>Emotion</strong> - Frustrated.<br>  <strong>Automatic thought</strong> - I don\'t have time to exercise.<br>  <strong>Descriptor</strong> - All or Nothing Thinking. <br> <strong>Constructive Responses</strong> - 1.) There\'s 24 hours in a day so I could fit in a 15 minute workout with my spouse every morning.  2.) I could wake up an hour early and workout with a friend.  3.) I could exercise over lunch every Wednesday.</p>',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/82_lets_think_of_some_constructive_responses.mp3',
                'inputs': [
                    {
                        'type': 'comparison',
                        'compared': [
                            'automaticThoughts',
                            'cognitiveDistortion'
                        ]
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'What would a rational response be?',
                        'type': 'textarea',
                        'name': 'rationalResponse',
                        'limit': 250
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'Continue',
                        'type': 'button',
                        'name': 'submit',
                        'target': 34
                    }
                ]
            },
            {
                'id': 34,
                'title': '',
                'subtitle': 'How are you feeling now?',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/28_how_are_you_feeling_now.mp3',
                'inputs': [
                    {
                        'label': 'Feeling slightly better',
                        'type': 'button',
                        'name': 'submit',
                        'target': 35
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'Same as before',
                        'type': 'button',
                        'name': 'submit',
                        'target': 36
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'Feeling slightly worse',
                        'type': 'button',
                        'name': 'submit',
                        'target': 36
                    },
                ]
            },
            {
                'id': 35,
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/29_well_done_now_lets_try_a_little_easier_question.mp3',
                'redirect': 37
            },
            {
                'id': 36,
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/39_no_worries_lets_move_on_to_a_little_easier_question.mp3',
                'redirect': 37
            },
            {
                'id': 37,
                'title': 'Exercise Benefits',
                'subtitle': 'Which exercise benefits do you see positively impacting your life?',
                'content': '',
                'waypoint': 50,
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/30_we_all_know_studies_have_found.mp3',
                'inputs': [
                    {
                        'label': 'Impact',
                        'type': 'checkbox',
                        'options': [
                            {
                                'label': 'Reducing my risk of heart attack',
                                'name': 'reduce_37'
                            },
                            {
                                'label': 'Lowering my blood cholesterol levels and blood pressure',
                                'name': 'blood_37'
                            },
                            {
                                'label': 'Lowering my risk of type-2 diabetes, osteoporosis and some cancers',
                                'name': 'loweringRisk_37'
                            },
                            {
                                'label': 'Losing weight',
                                'name': 'weight_37'
                            },
                            {
                                'label': 'Stronger muscles',
                                'name': 'stronger_37'
                            },
                            {
                                'label': 'Healthier skin',
                                'name': 'healthierSkin_37'
                            },
                            {
                                'label': 'Enhanced Brain Performance-Improve executive function, alertness, memory and productivity',
                                'name': 'enhanced_37'
                            },
                            {
                                'label': 'Feeling Better: having more energy, better mood, reducing stress and anxiety',
                                'name': 'feelingBetter_37'
                            },
                            {
                                'label': 'Sleeping better',
                                'name': 'sleeping_37'
                            }
                        ]
                    },
                    {
                        'label': 'Anything else?',
                        'type': 'text',
                        'name': 'anything-else'
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'Continue',
                        'type': 'button',
                        'name': 'submit',
                        'target': 38
                    }
                ]
            },
            {
                'id': 38,
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/31_alright.mp3',
                'redirect': 39
            },
            {
                'id': 39,
                'title': 'Exercise Status Check-In',
                'subtitle': 'Which of the following most accurately matches where you’re at with exercise?',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/83_so_were_all_at_different_places.mp3',
                'inputs': [
                    {
                        'label': 'I wish I could enjoy exercising regularly. Most of the time I think it sounds miserable.',
                        'type': 'button',
                        'name': 'miserable',
                        'target': 40
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'I\'m tired of false starts. I want to develop a sustainable, regular exercise program that I enjoy.',
                        'type': 'button',
                        'name': 'false-starts',
                        'target': 41
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'I want to explore a new sport or try a new fitness program.',
                        'type': 'button',
                        'name': 'explore',
                        'target': 42
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'I want to get back into a sport or fitness program I used to love.',
                        'type': 'button',
                        'name': 'get-back',
                        'target': 42
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'I am involved in my sport or fitness program and I want to move to the next level.',
                        'type': 'button',
                        'name': 'involved',
                        'target': 43
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'I just want to maintain what I\'m currently doing.',
                        'type': 'button',
                        'name': 'maintain',
                        'target': 43
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'I have no exercise goals at this time.',
                        'type': 'button',
                        'name': 'no-goals',
                        'target': 43
                    }
                ]
            },
            {
                'id': 40,
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/34_im_sorry_to_hear_that_hopefully.mp3',
                'redirect': 45
            },
            {
                'id': 41,
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/40_i_hear_ya.mp3',
                'redirect': 45
            },
            {
                'id': 42,
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/41_got_it.mp3',
                'redirect': 45
            },
            {
                'id': 43,
                'content': '##logic reference: in step##',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/41_got_it.mp3',
                'redirect': 74
            },
            {
                'id': 44,
                'content': '##logic reference: in step##',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/42_alright.mp3',
                'redirect': 74
            },
            {
                'id': 45,
                'title': 'Sports',
                'subtitle': 'What sports do you like, or think you would like?',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/45_since_physical_activity_can_come_in.mp3',
                'inputs': [
                    {
                        'type': 'checkbox',
                        'options': [
                            {
                                'label': 'Basketball - All Year',
                                'name': 'basketball_45'
                            },
                            {
                                'label': 'Boxing - All Year',
                                'name': 'boxing_45'
                            },
                            {
                                'label': 'Crossfit - All Year',
                                'name': 'crossfit_45'
                            },
                            {
                                'label': 'Cycling - Seasonal',
                                'name': 'cycling_45'
                            },
                            {
                                'label': 'Dancing',
                                'name': 'dancing45'
                            },
                            {
                                'label': 'Golf - Seasonal',
                                'name': 'golf_45'
                            },
                            {
                                'label': 'Hockey - All Year',
                                'name': 'hockey_45'
                            },
                            {
                                'label': 'Ice Skating- Seasonal',
                                'name': 'skating_45'
                            },
                            {
                                'label': 'Martial Arts - All Year',
                                'name': 'martial_45'
                            },
                            {
                                'label': 'Pickleball - All Year',
                                'name': 'pickleball_45'
                            },
                            {
                                'label': 'Mountain Biking - Seasonal',
                                'name': 'biking_45'
                            },
                            {
                                'label': 'Softball - Seasonal',
                                'name': 'softball_45'
                            },
                            {
                                'label': 'Soccer - All Year',
                                'name': 'soccer_45'
                            },
                            {
                                'label': 'Surfing - All Year/Seasonal',
                                'name': 'surfing_45'
                            },
                            {
                                'label': 'Skiing - Seasonal',
                                'name': 'skiing_45'
                            },
                            {
                                'label': 'Snowboarding - Seasonal',
                                'name': 'snowboarding_45'
                            },
                            {
                                'label': 'Raquetball - All Year',
                                'name': 'raquetball_45'
                            },
                            {
                                'label': 'Rock Climbing - All Year',
                                'name': 'climbing_45'
                            },
                            {
                                'label': 'Running - Seasonal',
                                'name': 'running_45'
                            },
                            {
                                'label': 'Swimming - All Year',
                                'name': 'swimming_45'
                            },
                            {
                                'label': 'Squash - All Year',
                                'name': 'squash_45'
                            },
                            {
                                'label': 'Table Tennis - All Year',
                                'name': 'table_45'
                            },
                            {
                                'label': 'Tennis - All Year',
                                'name': 'tennis_45'
                            },
                            {
                                'label': 'Volleyball - All Year',
                                'name': 'volleyball_45'
                            }
                        ]
                    },
                    {
                        'label': 'Other',
                        'type': 'text',
                        'name': 'other'
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'Continue',
                        'type': 'button',
                        'name': 'submit',
                        'target': 46
                    }
                ]
            },
            {
                'id': 46,
                'title': '',
                'subtitle': 'Would you be interested in any of these?',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/46_would_you_be_interested.mp3',
                'inputs': [
                    {
                        'label': 'Interests',
                        'type': 'checkbox',
                        'options': [
                            {
                                'label': 'Barre',
                                'name': 'barre_46'
                            },
                            {
                                'label': 'Body Bootcamp',
                                'name': 'bootcamp_46'
                            },
                            {
                                'label': 'Cardio Kickboxing',
                                'name': 'cardio_46'
                            },
                            {
                                'label': 'Crossfit',
                                'name': 'crossfit_46'
                            },
                            {
                                'label': 'Dancing',
                                'name': 'dancing_46'
                            },
                            {
                                'label': 'Group Cycling',
                                'name': 'cycling_46'
                            },
                            {
                                'label': 'Pilates',
                                'name': 'pilates_46'
                            },
                            {
                                'label': 'Yoga',
                                'name': 'yoga_46'
                            },
                            {
                                'label': 'Zumba',
                                'name': 'zumba_46'
                            },
                            {
                                'label': 'Regular workouts with a friend or loved one',
                                'name': 'regularFriends_46'
                            },
                            {
                                'label': 'Workout by myself at home or at a gym.  Then, meet with a personal trainer, coach or friend once a week.',
                                'name': 'atHome_46'
                            },
                            {
                                'label': 'Hike in the mountains/nature',
                                'name': 'hike_46'
                            },
                            {
                                'label': 'Walk the dog.',
                                'name': 'walkDog_46'
                            }
                        ]
                    },
                    {
                        'label': 'Other',
                        'type': 'text',
                        'name': 'other'
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'Continue',
                        'type': 'button',
                        'name': 'submit',
                        'target': 47
                    }
                ]
            },
            {
                'id': 47,
                'title': 'A Meaningful Exercise Goal',
                'subtitle': 'Why do you want to exercise?',
                'content': '<p><strong>Examples:</strong> Be around to watch my kids grow up. Look and feel like I did in college!</p>',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/47_as_most_of_us_know_exercise.mp3',
                'inputs': [
                    {
                        'label': 'Example: Look amazing, feel energetic and outperform my competition!',
                        'type': 'textarea',
                        'name': 'why-exercise-goal',
                        'limit': 250
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'Continue',
                        'type': 'button',
                        'name': 'submit',
                        'target': 48
                    }
                ],
                'attributes': {
                    'class': 'extended'
                }
            },
            {
                'id': 48,
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/59_got_it_3.mp3',
                'redirect': 49
            },
            {
                'id': 49,
                'title': 'Your Benchmark For Success',
                'subtitle': 'How will you know you’ve ”made it?"',
                'content': '<p>(example: In one year, I will be a certified Tennis coach and actively coaching players at my local tennis center.)</p>',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/48_imagine_yourself_in_the_future.mp3',
                'waypoint': 75,
                'inputs': [
                    {
                        'label': '(amount of time)',
                        'type': 'text',
                        'name': 'amount-of-time',
                        'prefix': 'In'
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': '(specific goal)',
                        'type': 'text',
                        'name': 'goal',
                        'prefix': 'I will be'
                    },
                    // {
                    //     'type': 'break'
                    // },
                    // {
                    //     'label': '(specific context)',
                    //     'type': 'text',
                    //     'name': 'in-context',
                    //     'prefix': 'and'
                    // },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'Continue',
                        'type': 'button',
                        'name': 'submit',
                        'target': 50
                    }
                ]
            },
            {
                'id': 50,
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/49_great.mp3',
                'redirect': 51
            },
            {
                'id': 51,
                'title': 'Scheduler',
                'subtitle': 'Let\'s build your weekly schedule',
                'content': '<p>For each day, specify if the day is a routine day or backup day, when you\'re available, the type of activity, and where the activity will take place.</p>',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/50_the_next_step_is_to_build.mp3',
                'inputs': [
                    {
                        'type': 'schedule',
                        'name': 'exercise-schedule'
                    },
                    {
                        'label': 'Save & Continue',
                        'type': 'button',
                        'name': 'submit',
                        'target': 52
                    },
                    {
                        'label': 'Skip',
                        'type': 'button',
                        'name': 'skip',
                        'target': 55
                    }
                ],
                'attributes': {
                    'class': 'extended'
                }
            },
            {
                'id': 52,
                'title': 'Integrate The Schedule Into Your Calendar',
                'subtitle': 'Do you want to email your schedule to yourself?',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/51_want_to_email_this.mp3',
                'inputs': [
                    {
                        'label': 'Email address',
                        'type': 'text',
                        'name': 'email-address'
                    },
                    {
                        'label': 'Submit',
                        'type': 'button',
                        'name': 'submit',
                        'target': 53
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'No, thanks',
                        'type': 'button',
                        'name': 'skip',
                        'target': 53
                    }
                ]
            },
            {
                'id': 53,
                'title': 'Workout Partner',
                'subtitle': 'Would you like to invite anyone to join you during your scheduled workout days?',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/52_would_you_like_to_invite_anyone.mp3',
                'inputs': [
                    {
                        'type': 'invitation',
                        'reference': 'exercise-schedule',
                        'name': 'exercise-invite'
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'Submit',
                        'type': 'button',
                        'name': 'submit',
                        'target': 54
                    },
                    {
                        'label': 'Not right now',
                        'type': 'button',
                        'name': 'skip',
                        'target': 54
                    }
                ]
            },
            {
                'id': 54,
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/26-11_ok.mp3',
                'redirect': 55
            },
            {
                'id': 55,
                'title': 'Exercise Social Network',
                'subtitle': 'Would you like to join a local network of peers with similar interests who would also benefit from a workout partner?',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/53_we_are_social_beings.mp3',
                'inputs': [
                    {
                        'label': 'Continue',
                        'type': 'button',
                        'name': 'skip',
                        'target': 58
                    }
                ]
            },
            {
                'id': 58,
                'title': 'Gym Membership',
                'subtitle': 'Do you need to sign up at a local fitness center?',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/55_moving_right_along.mp3',
                'inputs': [
                    {
                        'label': 'Yes',
                        'type': 'button',
                        'name': 'yes',
                        'target': 59
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'No, I’m already a member.',
                        'type': 'button',
                        'name': 'already-a-member',
                        'target': 60
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'No, My plan doesn\'t require a membership at a fitness center.',
                        'type': 'button',
                        'name': 'no',
                        'target': 60
                    }
                ]
            },
            {
                'id': 59,
                'title': '',
                'subtitle': '',
                'content': '<p>When will you research your local options and sign up?</p>',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/57_in_my_experience.mp3',
                'inputs': [
                    {
                        'type': 'schedule',
                        'name': 'schedule'
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'Save & Continue',
                        'type': 'button',
                        'name': 'submit',
                        'target': 61
                    }
                ],
                'attributes': {
                    'class': 'extended'
                }
            },
            {
                'id': 60,
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/56_alright.mp3',
                'redirect': 61
            },
            {
                'id': 61,
                'title': 'Who Can Help You',
                'subtitle': 'Who can help you with your plan?',
                'content': '<p>Next to each person, select on a scale of 1 to 10 how important their help will be. <br><strong>1 = not necessary, 10 = Can\'t do it without them</strong>.</p>',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/58_who_can_help_you.mp3',
                'inputs': [
                    {
                        'type': 'range',
                        'name': 'range'
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'Save & Continue',
                        'type': 'button',
                        'name': 'submit',
                        'target': 62
                    }
                ]
            },
            {
                'id': 62,
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/59_got_it_3.mp3',
                'redirect': 63
            },
            {
                'id': 63,
                'title': 'A Dose of Pessimism',
                'subtitle': 'Describe a likely willpower failure you could encounter.',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/84_lets_be_pessimistic.mp3',
                'inputs': [
                    {
                        'type': 'comparison',
                        'compared': [
                            'goal'
                        ]
                    },
                    {
                        'label': 'Your answer',
                        'type': 'textarea',
                        'name': 'biggest-obstacle',
                        'limit': 250
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'Continue',
                        'type': 'button',
                        'name': 'submit',
                        'target': 164
                    }
                ]
            },
            {
                'id': 164,
                'title': '',
                'subtitle': 'What will you be thinking and feeling?',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/85_when_that_temptation_to_give_in_occurs.mp3',
                'inputs': [
                    {
                        'label': 'Your answer',
                        'type': 'textarea',
                        'name': 'biggest-obstacle',
                        'limit': 250
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'Continue',
                        'type': 'button',
                        'name': 'submit',
                        'target': 165
                    }
                ]
            },
            {
                'id': 165,
                'title': '',
                'subtitle': 'How will you overcome the temptation?',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/86_what_actions_could_you_take.mp3',
                'inputs': [
                    {
                        'label': 'Your answer',
                        'type': 'textarea',
                        'name': 'biggest-obstacle',
                        'limit': 250
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'Continue',
                        'type': 'button',
                        'name': 'submit',
                        'target': 166
                    }
                ]
            },
            {
                'id': 166,
                'title': '',
                'subtitle': 'What will you be thinking and feeling?',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/87_now_imagine_yourself_overcoming.mp3',
                'inputs': [
                    {
                        'label': 'Your answer',
                        'type': 'textarea',
                        'name': 'biggest-obstacle',
                        'limit': 250
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'Continue',
                        'type': 'button',
                        'name': 'submit',
                        'target': 167
                    }
                ]
            },
            {
                'id': 167,
                'title': '',
                'subtitle': '',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/88_great_now_before_we_start_setbacks.mp3',
                'redirect': 64
            },
            {
                'id': 64,
                'title': 'Check-In',
                'subtitle': 'What insight did you have about yourself today?',
                'content': '<p>Thinking back on the questions you’ve answered already, what insights do you have about your goal? For instance, maybe after reviewing the likely obstacles you have realized that your goals were a bit too lofty.  So you\'re going to do some adjusting so it\'s not only inspiring but also attainable.</p>',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/61_i_want_to_do_a_quick_check-in.mp3',
                'inputs': [
                    {
                        'type': 'insights'
                    },
                    {
                        'label': 'Your thoughts',
                        'type': 'textarea',
                        'name': 'goal-reflection',
                        'limit': 250
                    },
                    {
                        'label': 'Continue',
                        'type': 'button',
                        'name': 'submit',
                        'target': 65
                    }
                ]
            },
            {
                'id': 65,
                'title': 'Emotions Check-In',
                'subtitle': 'Which emotion do you feel the strongest when you consider taking action on your plan this week?',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/62_almost_done.mp3',
                'inputs': [
                    {
                        'label': 'Strongest Emotion',
                        'type': 'radio',
                        'name': 'strongestEmotion',
                        'options': [
                            {
                                'label': 'Energized',
                                'target': 66
                            },
                            {
                                'label': 'Excited',
                                'target': 66
                            },
                            {
                                'label': 'Optimistic',
                                'target': 66
                            },
                            {
                                'label': 'Hopeful',
                                'target': 66
                            },
                            {
                                'label': 'Refreshed',
                                'target': 66
                            },
                            {
                                'label': 'Content',
                                'target': 66
                            },
                            {
                                'label': 'Confident',
                                'target': 66
                            },
                            {
                                'label': 'Frustrated',
                                'target': 67
                            },
                            {
                                'label': 'Overwhelmed',
                                'target': 67
                            },
                            {
                                'label': 'Exhausted',
                                'target': 67
                            },
                            {
                                'label': 'Cynical',
                                'target': 67
                            },
                            {
                                'label': 'Apathetic',
                                'target': 67
                            }
                        ]
                    },
                    {
                        'label': 'Continue',
                        'type': 'button',
                        'name': 'submit',
                        'target': 'strongestEmotion'
                    }
                ]
            },
            {
                'id': 66,
                'title': '',
                'subtitle': '',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/63_awesome_now_that_youre_finished.mp3',
                'redirect': 69
            },
            {
                'id': 67,
                'title': '',
                'subtitle': '',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/64_im_sorry_to_hear_that_i_do_think_it_would_be.mp3',
                'redirect': 69
            },
            // {
            //     'id': 68,
            //     'title': 'Schedule a Coaching Session',
            //     'subtitle': '',
            //     'content': '<p>Would you like to schedule a coaching session?</p>',
            //     'inputs': [
            //         {
            //             'label': 'Yes',
            //             'type': 'button',
            //             'name': 'confirm',
            //             'target': 69
            //         },
            //         {
            //             'label': 'No thanks.',
            //             'type': 'button',
            //             'name': 'decline',
            //             'target': 70
            //         }
            //     ]
            // },
            {
                'id': 69,
                'title': 'Our coaches',
                'subtitle': '',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/65_heres_a_list_of_some.mp3',
                'inputs': [
                    {
                        'type': 'coaches'
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'No, thanks',
                        'type': 'button',
                        'name': 'decline',
                        'target': 71
                    }
                ],
                'attributes': {
                    'class': 'extended'
                }
            },
            {
                'id': 70,
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/66_not_a_problem.mp3',
                'redirect': 71
            },
            {
                'id': 71,
                'title': 'Share Your Results',
                'subtitle': 'Who would you like to share your results with?',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/67_you_can_share_you_plan_results.mp3',
                'inputs': [
                    {
                        'label': 'Email address(es)',
                        'type': 'textarea',
                        'name': 'email-addresses',
                        'limit': 250
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'Submit',
                        'type': 'button',
                        'name': 'submit',
                        'target': 72
                    },
                    {
                        'label': 'No thanks',
                        'type': 'button',
                        'name': 'decline',
                        'target': 73
                    }
                ]
            },
            {
                'id': 72,
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/68_alright.mp3',
                'redirect': 74
            },
            {
                'id': 73,
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/69_not_interested_no_worries.mp3',
                'redirect': 74
            },
            {
                'id': 74,
                'title': 'Integrated NeuroHealth App',
                'subtitle': 'Would you like a link texted to your phone to download the INHealth app?',
                'content': '<div class="gallery"><img src="https://s3-us-west-2.amazonaws.com/elation-asset-bucket/images/inhealth/1_Checkin.png" alt="Checkin" /> <img src="https://s3-us-west-2.amazonaws.com/elation-asset-bucket/images/inhealth/2_Customize_Checkin.png" alt="Customize Checkin" /> <img src="https://s3-us-west-2.amazonaws.com/elation-asset-bucket/images/inhealth/3_Insights.png" alt="Insights" /> <img src="https://s3-us-west-2.amazonaws.com/elation-asset-bucket/images/inhealth/4_Library.png" alt="Library" /> <img src="https://s3-us-west-2.amazonaws.com/elation-asset-bucket/images/inhealth/5_NewsFeed.png" alt="Newsfeed" /></div>',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/89_integrated_neurohealth.mp3',
                'inputs': [
                    {
                        'label': 'Enter your 10 digit cell phone number here',
                        'type': 'text',
                        'name': 'sms-number'
                    },
                    {
                        'type': 'break'
                    },
                    {
                        'label': 'Submit',
                        'type': 'button',
                        'name': 'submit',
                        'target': 75
                    },
                    {
                        'label': 'No thanks',
                        'type': 'button',
                        'name': 'decline',
                        'target': 76
                    }
                ]
            },
            {
                'id': 75,
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/72_great_link_sent.mp3',
                'redirect': 77
            },
            {
                'id': 76,
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/73_not_a_problem_you_can_always_find_it.mp3',
                'redirect': 77
            },
            {
                'id': 77,
                'title': 'Coaching Session Results',
                'subtitle': '',
                'content': '',
                'media': 'https://s3-us-west-2.amazonaws.com/elation-asset-bucket/malcom/74_now_lets_take_a_look_at_your_results.mp3',
                'waypoint': 'end',
                'inputs': [
                    {
                        'type': 'results'
                    }
                ]
            }
        ]
    }
];
