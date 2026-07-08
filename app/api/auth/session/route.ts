import prisma from '@/lib/prisma';
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

    const userId = (session.user as { id?: string }).id;
    const user = userId ? await prisma.user.findUnique({ where: { id: userId } }) : null;

    return Response.json(
      {
        authenticated: true,
        user: {
          id: userId,
          email: session.user?.email,
          name: session.user?.name,
          image: session.user?.image,
          plan: user?.plan ?? (session.user as { plan?: string }).plan ?? 'FREE',
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
