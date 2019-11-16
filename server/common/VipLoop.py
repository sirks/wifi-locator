from asyncio import Task, Handle
from asyncio.unix_events import SelectorEventLoop, DefaultEventLoopPolicy
from typing import Coroutine


class VipLoop(SelectorEventLoop):
    """
    BEWARE
    Thread Unsafe

    Currently operates binary - vip/normal
    But can introduce Enum with multiple values
    """

    def __init__(self):
        super().__init__()
        self.vip = False

    def vip_create_task(self, coro: Coroutine) -> Task:
        self.vip = True
        return Task(coro, loop=self)

    def create_task(self, coro: Coroutine) -> Task:
        self.vip = False
        return Task(coro, loop=self)

    def vip_call_soon(self, callback, *args, context=None) -> Handle:
        self.vip = True
        return self._call_soon(callback, args, context)

    def call_soon(self, callback, *args, context=None):
        self.vip = False
        return self._call_soon(callback, args, context)

    def _call_soon(self, callback, args, context) -> Handle:
        handle = Handle(callback, args, self, context)
        if self.vip:
            self._ready.appendleft(handle)
        else:
            self._ready.append(handle)
        return handle


class VipLoopPolicy(DefaultEventLoopPolicy):
    _loop_factory = VipLoop
