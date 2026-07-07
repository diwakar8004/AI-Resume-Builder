import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await auth();
    
    if (!session) {
      return Response.json(
        { authenticated: false, message: 'No active session' },
        { status: 200 }
      );
    }

    return Response.json(
      {
        authenticated: true,
        user: {
          id: (session.user as { id?: string }).id,
          email: session.user?.email,
          name: session.user?.name,
          image: session.user?.image,
        },
        expiresAt: session.expires,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Session Check] Error:', error);
    return Response.json(
      { 
        authenticated: false, 
        error: 'Failed to retrieve session',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
