import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import Ajv from 'ajv';

export const dynamic = 'force-dynamic'

// Checks for valid authentication
export function withAuth(handler) {
  const wrapped = async (req) => {
    try {
      const session = await getServerSession();
      if (!session || !session.user) {
        return new NextResponse('Unauthorized request', { status: 401 })
      }

      const profileRecord = await prisma.user.findUnique({
        where: {
          email: session.user.email
        }
      })

      if (!profileRecord) {
        return new NextResponse('Critical error. Failed to find matching user profile.', { status: 500 })
      }

      req.user = profileRecord

      return handler(req)
    } catch(e) {
      console.log('Error in withAuth middleware:', e);
      return new NextResponse('Oops - something bad has occured', { status: 500 })
    }
  }

  return wrapped
}


export function withSearchParams(params, handler) {
  const ajv = new Ajv();

  const buildSchema = (params) => {
    let required = []
    let newParams = {}

    for (const [key, value] of Object.entries(params)) {
      if (value.required) {
        required.push(key)
      }

      const newValue = {...value}
      delete newValue.required
      newParams[key] = newValue
    }

    const schema = {
      type: 'object',
      properties: newParams,
      required: required,
      additionalProperties: true,
    };
    return schema
  }

  const wrapped = async (req) => {
    try {
      const schema = buildSchema(params)
      let paramsObj = {};
      for(let pair of req.nextUrl.searchParams.entries()) {
         paramsObj[pair[0]] = pair[1]; 
      }
      const valid = ajv.validate(schema, paramsObj)
      if (!valid) {
        return new NextResponse('Invalid query parameters.', { status: 400 });
      }
      req.params = paramsObj

      return handler(req)
    } catch(e) {
      console.log('Error in withSchema middleware:', e);
      return new NextResponse('Oops - something bad has occured', { status: 500 })
    }
  }

  return wrapped
}
