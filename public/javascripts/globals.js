/* Global variables --------------------------------------------------------------------------------------------------*/
var G = {
    pollInterval : null,
    actionData: [
        new SoloTextAction({
            'container': '#lab1-stage',
            'data': 'Jag heter Magnus...',
            'duration': 2
        }),
        new SoloTextAction({
            'container': '#lab1-stage',
            'data': '...jag är webbutvecklare...',
            'duration': 2
        }),
        new SoloTextAction({
            'container': '#lab1-stage',
            'data': '...och jag gillar kaffe!',
            'duration': 2
        }),
        /*
         new TypewriterTextAction({
         'container': '#lab1-stage',
         'data': 'Måste bara testa detta först... hej svejs',
         'chardelay': 100
         }), */
        /*
        new YouTubeAction({
            'container': '#youtube-video',
            'data': {
                'start': 10,
                'url': 'http://www.youtube.com/v/ii4Ev8Dyo20',
                'annotations': [{   // TODO: Thinking about using actions here instead.
                    'start': 2,
                    'duration': 5,
                    'text': 'This video is WHACK!'
                },
                    {
                        'start': 8,
                        'duration': 5,
                        'text': 'Like a heart attack!'
                    }]
            },
            'duration': 10
        }),*/
        new SoloTextAction({
            'container': '#lab1-stage',
            'data': 'Hej då!',
            'duration': 5
        })
    ]
}